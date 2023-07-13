import axios from "axios";
import cheerio from "cheerio";
import ora from "ora";

const FetchMacPrice = (productUrl) => {
  const spinner = ora("Loading .......Please wait a second").start();

  axios.get(productUrl).then(({ data }) => {
    const $ = cheerio.load(data);
    const getMacPrice = $(".a-offscreen").text();
    const priceStrings = getMacPrice.match(/[\d,.]+/g) || [];
    const firstPrice = priceStrings[0] || "0";
    const normalPrice = parseFloat(firstPrice.replace(/[^0-9.]+/g, ""));
    const sellerInfo = $("#merchant-info").text();
    const details = $(".a-normal").text();

    // Price details
    spinner.succeed(`Fetch price for ${$("title").text().substring(0, 100)} :: ${normalPrice}`);

    // SellerName
    console.log("Seller name", sellerInfo);

    // details
    // console.log(details);
  });
};

const PRODUCT_URL = "https://www.amazon.in/2022-Apple-MacBook-Laptop-chip/dp/B0B3BLY13H/ref=pd_rhf_d_gw_s_pd_sbs_rvi_sccl_1_4/262-1807722-1573664?pd_rd_w=GmMBp&content-id=amzn1.sym.f2f99b52-a5ca-432b-8bfe-0d72feb3d1ba&pf_rd_p=f2f99b52-a5ca-432b-8bfe-0d72feb3d1ba&pf_rd_r=HRG1E6HV121K64MPS2WV&pd_rd_wg=DumBN&pd_rd_r=297e433c-7aa2-4ef2-9ab1-3503677435af&pd_rd_i=B0B3BLY13H&psc=1";

FetchMacPrice(PRODUCT_URL);
