let mongoose = require("mongoose");
let list = require("../models/list.js")
main()
.then((res)=>{console.log("connection Succesaful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sampleLists = [
  {
    title: "Ocean View Apartment",
    description: "Sea-facing apartment with balcony and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://poetreehomes.com/frontend/img/page-img/Ocean-View-Keyword-big.jpg"
    },
    price: 7500,
    location: "Goa",
    country: "India",
    filter: "tropical"
  },
  {
    title: "Mountain Breeze Cottage",
    description: "A cozy hillside cottage with breathtaking mountain views.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/17/c2/25/mountain-breeze-lodge.jpg?w=700&h=-1&s=1"
    },
    price: 5400,
    location: "Manali",
    country: "India",
    filter: "countryside"
  },
  {
    title: "Urban Chic Studio",
    description: "Modern studio apartment ideal for solo travelers or couples.",
    image: {
      filename: "listingimage",
      url: "https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/jigmswmjrzb0bsocugyw"
    },
    price: 3900,
    location: "Mumbai",
    country: "India",
    filter: "tinyhome"
  },
  {
    title: "Palm Retreat Villa",
    description: "Luxury villa with private pool surrounded by palm trees.",
    image: {
      filename: "listingimage",
      url: "https://dynamic-media.tacdn.com/media/vr-splice-j/12/85/d6/95.jpg?w=800&h=-1"
    },
    price: 12800,
    location: "Kerala",
    country: "India",
    filter: "lux"
  },
  {
    title: "Royal Heritage Haveli",
    description: "Experience royal living in a restored 18th-century haveli.",
    image: {
      filename: "listingimage",
      url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202012281413216511-2fe10478482e11eb9fb70242ac110003.jpg"
    },
    price: 15500,
    location: "Jaipur",
    country: "India",
    filter: "historical"
  },
  {
    title: "City Lights Apartment",
    description: "Panoramic city view from the 20th floor, near metro station.",
    image: {
      filename: "listingimage",
      url: "https://img.freepik.com/premium-photo/3d-rendered-photo-10h-apartment-overlooking-city-lights-night-style-naturalist_1103059-40265.jpg?w=360"
    },
    price: 6200,
    location: "Delhi",
    country: "India",
    filter: "tinyhome"
  },
  {
    title: "Peaceful Riverside Cabin",
    description: "Serene cabin located next to the river, perfect for meditation.",
    image: {
      filename: "listingimage",
      url: "https://i.ytimg.com/vi/OVEz2SNfCGw/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgTCgnMA8=&rs=AOn4CLCNokdPdczKsltHzPCPYePaT278ww"
    },
    price: 4200,
    location: "Rishikesh",
    country: "India",
    filter: "lakefront"
  },
  {
    title: "Sundarban Eco Lodge",
    description: "Eco-friendly lodge surrounded by lush mangroves and wildlife.",
    image: {
      filename: "listingimage",
      url: "https://tourdesundarbans.com/wp-content/uploads/2023/07/sundarban-eco-village.webp"
    },
    price: 3800,
    location: "Sundarban",
    country: "India",
    filter: "treehouse"
  },
  {
    title: "Forest Hideaway Treehouse",
    description: "Stay in a wooden treehouse amidst the dense forest canopy.",
    image: {
      filename: "listingimage",
      url: "https://gos3.ibcdn.com/af9d0f5a05aa11e88c540288e80e061e.jpg"
    },
    price: 6700,
    location: "Coorg",
    country: "India",
    filter: "treehouse"
  },
  {
    title: "Beachside Bungalow",
    description: "A charming beach bungalow perfect for sunrise walks and sea breeze.",
    image: {
      filename: "listingimage",
      url: "https://thumbs.dreamstime.com/b/tropical-paradise-beachside-bungalow-serenity-escape-dream-charming-thatched-roof-nestled-pristine-white-sand-beach-396878022.jpg"
    },
    price: 5900,
    location: "Pondicherry",
    country: "India",
    filter: "beachfront"
  },
  {
    title: "Lakeview Homestay",
    description: "Peaceful homestay beside a calm lake, includes local breakfast.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/182493407.jpg?k=127bd0da5e7fca2a081226caca07edb0bf4d77a57aae7f195d148f1cab9ac0d6&o=&hp=1"
    },
    price: 5100,
    location: "Nainital",
    country: "India",
    filter: "lakefront"
  },
  {
    title: "City Comfort Suites",
    description: "Fully furnished business suite with complimentary workspace.",
    image: {
      filename: "listingimage",
      url: "https://dayuse.twic.pics/hotels/13118/1040046301fae58482c782031e142fb4-comfort-suites-near-city-of-industry-los-angeles.jpg?twic=v1/resize=3840/quality=75"
    },
    price: 7200,
    location: "Bangalore",
    country: "India",
    filter: "tinyhomes"
  },
  {
    title: "Artistic Heritage Home",
    description: "Vintage home decorated with traditional paintings and art.",
    image: {
      filename: "listingimage",
      url: "https://assets.architecturaldigest.in/photos/68caad92aca18961d7e3b0bd/16:9/w_1620,h_911,c_limit/Untitled%20design%20-%202025-09-17T181556.813.png"
    },
    price: 4700,
    location: "Kolkata",
    country: "India",
    filter: "historical"
  },
  {
    title: "Luxury Sky Loft",
    description: "Minimalist loft with stunning skyline views from floor-to-ceiling windows.",
    image: {
      filename: "listingimage",
      url: "https://a0.muscache.com/im/pictures/943e5bba-12e0-447a-a0e3-ccbac4f9261f.jpg?im_w=720"
    },
    price: 9900,
    location: "Gurugram",
    country: "India",
    filter: "lux"
  },
  {
    title: "Desert Mirage Camp",
    description: "Traditional desert tents with cultural programs and camel rides.",
    image: {
      filename: "listingimage",
      url: "https://rajwadadesertcamp.com/wp-content/uploads/2024/11/desert-camp-stay-in-jaisalmer.jpg"
    },
    price: 4300,
    location: "Jaisalmer",
    country: "India",
    filter: "countryside"
  },
  {
    title: "Heritage Hill Palace",
    description: "Stay in a restored palace surrounded by hills and gardens.",
    image: {
      filename: "listingimage",
      url: "https://www.explorebees.com/uploads/Hill%20Palace%20Museum%20(2).jpg"
    },
    price: 13900,
    location: "Udaipur",
    country: "India",
    filter: "vineyard"
  },
  {
    title: "Countryside Farm Stay",
    description: "Rustic farm experience with fresh food and nature walks.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/462225095.jpg?k=7d9fe04cd420de2cbd5eae273577b19c31cbec37c925d8ea2df5168b29b7c2f6&o=&hp=1"
    },
    price: 3600,
    location: "Nashik",
    country: "India",
    filter: "countryside"
  },
  {
    title: "Snow Valley Chalet",
    description: "Warm and cozy chalet in snow-covered valleys, perfect for winter getaways.",
    image: {
      filename: "listingimage",
      url: "https://le-bettex.com/wp-content/uploads/2018/09/Chalets_Lacuzon_Snow_Valley_ext%C3%A9rieur-700x370.jpg"
    },
    price: 6800,
    location: "Shimla",
    country: "India",
    filter: "countryside"
  },
  {
    title: "Island View Villa",
    description: "Private villa on a small island with 360-degree ocean view.",
    image: {
      filename: "listingimage",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd89Nmdvxo36CsQ6YOb3qciLUn9lx3BRb4vA&s"
    },
    price: 16200,
    location: "Andaman",
    country: "India",
    filter: "beachfront"
  },
  {
    title: "Cultural Homestay",
    description: "Experience local culture and cuisine with a warm family stay.",
    image: {
      filename: "listingimage",
      url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA1MTI0MDQ3OTY4MzMwNjA3MA==/original/d94885e5-6f02-4cd5-b285-877b302f63a3.jpeg?im_w=720"
    },
    price: 3100,
    location: "Varanasi",
    country: "India",
    filter: "historical"
  },
  {
    title: "Riverfront Villa",
    description: "Modern villa beside a calm river, ideal for boating and fishing lovers.",
    image: {
      filename: "listingimage",
      url: "https://i.ytimg.com/vi/2I-fI4xIqo4/maxresdefault.jpg"
    },
    price: 8900,
    location: "Alleppey",
    country: "India",
    filter: "lakefront"
  },
  {
    title: "Skyview Penthouse",
    description: "Top-floor penthouse with a private terrace and city skyline view.",
    image: {
      filename: "listingimage",
      url: "https://media.vrbo.com/lodging/24000000/23270000/23269400/23269369/96ac24d4.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
    },
    price: 13300,
    location: "Hyderabad",
    country: "India",
    filter: "lux"
  },
  {
    title: "Minimal Zen Apartment",
    description: "Japanese-inspired minimal design apartment for peaceful living.",
    image: {
      filename: "listingimage",
      url: "https://media.admiddleeast.com/photos/657844aea0c078f1e79832f3/16:9/w_2560%2Cc_limit/AugustineWong090623_NateleeCocks_005.JPG"
    },
    price: 6100,
    location: "Pune",
    country: "India",
    filter: "tinyhome"
  },
  {
    title: "Hilltop Castle Stay",
    description: "Experience the grandeur of an ancient fort with modern luxury.",
    image: {
      filename: "listingimage",
      url: "https://www.wanderlustmagazine.com/wp-content/uploads/2024/12/HR-KFTY3K-sharp_2800-scaled.jpg"
    },
    price: 14200,
    location: "Mysore",
    country: "India",
    filter: "countryside"
  }
];


module.exports = {data :sampleLists};
