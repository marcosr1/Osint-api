import dns from "dns/promises";
import axios from "axios";
import * as whois from "whois"; 

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
        return {
            domain,
            ip: result.address,
            family: result.family
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
    return { error: "GeoIP kkkkk" };
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
 