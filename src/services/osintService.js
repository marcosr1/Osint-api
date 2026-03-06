import dns from "dns/promises";
import axios from "axios";
import * as whois from "whois";
import whois2 from "whois-json";

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
      if (err) {
        reject(err);
      } else {
        resolve({ domain, raw: data });
      }
    });
  });
};

export const getWhoisJson = async (domain) => {
    try {
        const data = await whois2(domain);
        return ({domain, raw: data});
    } catch ( error ) {
        return {domain, error: error.message};
    }
};