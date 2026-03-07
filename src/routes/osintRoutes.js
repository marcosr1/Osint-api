import express from "express";
import { lookUpDNS, getHeaders, getStatus, getGeoIp, getWhois, getIp, searchUserName, getAddressFromCords } from "../services/osintService.js";

const router = express.Router();

router.get("/dns", async (req, res) => {
  const { domain } = req.query;
  const data = await lookUpDNS(domain);
  res.json(data);
});

router.get("/headers", async (req, res) => {
  const { url } = req.query;
  const data = await getHeaders(url);
  res.json(data);
});

router.get("/status", async (req, res) => {
  const { url } = req.query;
  const data = await getStatus(url);
  res.json(data);
});

router.get("/geoip", async (req, res) => {
  const { ip } = req.query;
  const data = await getGeoIp(ip);
  res.json(data);
});

router.get("/whois", async (req, res) => {
  const { domain } = req.query;
  const data = await getWhois(domain);
  res.json(data);
});

router.get("/getip", async (req, res) => {
    const {domain} = req.query;
    const data = await getIp(domain);
    res.json(data);
});

router.get("/username", async (req, res) => {
  const {username} = req.query;
  const result = await searchUserName(username);
  res.json({
      username,
      results: result
    });
})

router.get("/address", async (req, res) => {
  const { lat, lon } = req.query;
  const address = await getAddressFromCords(lat, lon);
  res.json({address})
})

export default router;