import express from "express";
import { lookUpDNS, getHeaders, getStatus, getGeoIp, getWhois, getWhoisJson } from "../services/osintService.js";

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

router.get("/whoisJson", async (req, res) => {
  const { domain } = req.query;
  const data = await getWhoisJson(domain);
  res.json(data);
});

export default router;