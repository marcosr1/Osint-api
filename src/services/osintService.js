import dns from "dns/promises";
import axios from "axios";
import * as whois from "whois"; 
import { sites } from "../utils/sites.js"

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const lookUpDNS = async (domain) => {
  try {
    const addresses = await dns.resolve4(domain);
    return { domain, addresses };
  } catch (error) {
    return { domain, error: "Não deu man", error };
  }
};

export const getHeaders = async (url) => {
  try {
    const response = await axios.head(url);
    return response.headers;
  } catch (error) {
    return { error: "putz" };
  }
};

export const getStatus = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    return { status: response.status };
  } catch (error) {
    return { status: error.response?.status || "off" };
  }
};

export const getIp = async (domain) => {
    try { 
        const result = await dns.lookup(domain);

        let geoIp = null;

        if (result.address != null) {
            geoIp = await getGeoIp(result.address);
        }

        return {
            domain,
            ip: result.address,
            family: result.family,
            geoIp
        };
    } catch (err) {
        return { error: err.message };
    }
}

export const getGeoIp = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    return { error: "GeoIP??? kkkkk" };
  }
};

export const getWhois = (domain) => {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err, data) => {

        const result = {};

        data.split("\n").forEach(line => {
            const parts = line.split(":");
            if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(":").trim();
            result[key] = value;
            }
        });
      if (err) {
        reject(err);
      } else {
        resolve({ domain, raw: result });
      }
    });
  });
};
 

export const searchUserName = async (username) => {
  const result = []
  for (const site of sites ) {
    const url = site.url.replace("{}", username)

    try {
      const response = await axios.get(url, {
        validateStatus: () => true
      })

      if (response.status === 200) {
        result.push({
          site: site.name,
          url: url,
          found: true
        })
      } else {
        result.push({
          site: site.name,
          url: url,
          found: false
        })
      }
    } catch (error) {
        result.push({
          site: site.name,
          url: url,
          found: false
        })
    }
  }

  return result
}

export const getAddressFromCords = async (lat, lon) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: { lat, lon, format: "json" },
      headers: { "User-Agent": "MeuAppOSINT/1.0 (contato@seudominio.com)" }
    });

    return { lat, lon, address: response.data.display_name, components: response.data.address };
  } catch (error) {
    return { error: error.message }
  }
}

export const getSubDominios = async (domain) => {
  try {
    const url = `https://crt.sh/?q=%25.${domain}&output=json`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const subdominios = [];

    for (const cert of response.data) {
      const names = cert.name_value.split("\n");

      for ( const name of names ) {

        if (name.includes(domain)) {
          try {
            const resultIp = await dns.lookup(name);
            subdominios.push({ subdominios: name.trim(), ip: resultIp.address }); 
          } catch (error) {
            subdominios.push({ subdominios: name.trim(), ip: null });
          }
        };
      };
    };
    return [...subdominios];
  } catch (error) {
    return { error: error.message }
  };
};