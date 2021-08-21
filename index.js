// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// app.use(cors());
// app.use(bodyParser.json());
// const bugs = [
//   { id: 1, description: "Bug 1", userId: 1, resolved: true },
//   { id: 2, description: "Bug 2", userId: 1 },
//   { id: 3, description: "Bug 3", userId: 2 },
//   { id: 4, description: "Bug 4" }
// ];
// app.get("/api/bugs", (req, res) => {
//   res.json(bugs);
// });
// app.post("/api/bugs", (req, res) => {
//   const bug = { id: Date.now(), resolved: false, ...req.body };
//   bugs.push(bug);
//   res.json(bug);
// });
// app.patch("/api/bugs/:id", (req, res) => {
//   const index = bugs.findIndex(bug => bug.id === parseInt(req.params.id));
//   const bug = bugs[index];
//   if ("resolved" in req.body) bug.resolved = req.body.resolved;
//   if ("userId" in req.body) bug.userId = req.body.userId;
//   res.json(bug);
// });
// app.listen(9001, () => {
//   console.log("Node server started on port 9001.");
// });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
let serviceCatagoryId; 
let serviceSubCatagoryId;
const serviceCatagory = [
  [
    { id: 1, name: "AC Service" },
    { id: 2, name: "Appliance Repairing" },
    { id: 3, name: "Cleaning Services"  },
    { id: 4, name: "Disinfecting Service"  }
  ],
  [
    { id: 1, name: "AC Basic Service", price: 1200, rating: 4.5, type: "AC Type", Unit: [{name: "1-1.5 Tonne", value: 1, price: 1200}, {name: "Two", value: 2, price: 1400}, {name: "Three", value: 3, price: 1600}] },
    { id: 2, name: "AC Master Service", price: 1300, rating: 4.2, type: "AC Type", Unit: [{name: "1-1.5 Tonne", value: 1, price: 1300}, {name: "Two", value: 2, price: 1500}, {name: "Three", value: 3, price: 1700}] },
    { id: 3, name: "AC Gas Recharge", price: 1400, rating: 4.3, type: "AC Type", Unit: [{name: "1-1.5 Tonne", value: 1, price: 1400}, {name: "Two", value: 2, price: 1600}, {name: "Three", value: 3, price: 1800}] },
    { id: 4, name: "AC  Drop", price: 1600, rating: 4.8, type: "AC Type", Unit: [{name: "1-1.5 Tonne", value: 1, price: 1600}, {name: "Two", value: 2, price: 1800}, {name: "Three", value: 3, price: 2000}]  }
  ],
  [
    { id: 5, name: "TV Repairing", price: 2500, rating: 4.5, type: "Appliance Type", Unit: [{name: "25 inch", value: 1, price: 2500}, {name: '35""', value: 2, price: 2800}, {name: '45""', value: 3, price: 3000}] },
    { id: 6, name: "Oven Repairing", price: 2250, rating: 4.2, type: "Appliance Type", Unit: [{name: "1-1.5 liter", value: 1, price: 2250}, {name: "2.5", value: 2, price: 3300}, {name: "3", value: 3, price: 4000}]},
    { id: 8, name: "Laptop repair", price: 300, rating: 4.8,  type: "Appliance Type", Unit: [{name: "Disgnosis", value: 1, price: 300}, {name: "Repair", value: 2, price: 500}]  }
  ],
  [
    { id: 9, name: "Bathroom Deep Clean", price: 800, rating: 4.5, type: "Floor Area", Unit: [{name: "80 - 120 sft", value: 1, price: 800}, {name: "150-180", value: 2, price: 1400}, {name: "200+", value: 3, price: 1600}]  },
    { id: 10, name: "Bathroom Basic Clean", price: 500, rating: 4.2, type: "Floor Area", Unit: [{name: "80 - 120 sft", value: 1, price: 500}, {name: "150-180", value: 2, price: 800}, {name: "200+", value: 3, price: 1000}]  },
    { id: 11, name: "Kitchen Deep Clean", price: 1000, rating: 4.3, type: "Floor Area", Unit: [{name: "100 - 120 sft", value: 1, price: 1000}, {name: "120-200", value: 2, price: 1400}, {name: "200+", value: 3, price: 1600}]   },
    { id: 12, name: "Full Home Deep Clean", price: 3000, rating: 4.8, type: "Floor Area", Unit: [{name: "800 - 1200 sft", value: 1, price: 3000}, {name: "1500-1800", value: 2, price: 1400}, {name: "2000+", value: 3, price: 1600}]   }
  ],
  [
    { id: 13, name: "Disinfecting Home", price: 1500, rating: 4.5, type: "Floor Area", Unit: [{name: "800 - 1200 sft", value: 1, price: 1500}, {name: "1500-1800", value: 2, price: 1400}, {name: "2000+", value: 3, price: 1600}]  },
    { id: 14, name: "Disinfecting Office", price: 2500, rating: 4.2, type: "Floor Area", Unit: [{name: "1500 - 1800 sft", value: 1, price: 2500}, {name: "2000+", value: 2, price: 1800}, {name: "3000+", value: 3, price: 2000}]  },
    { id: 15, name: "Disinfecting Warehouse", price: 3500, rating: 4.3, type: "Floor Area", Unit: [{name: "5000sft", value: 1, price: 3500}, {name: "7000sft", value: 2, price: 5000}, {name: "10,000sft", value: 3, price: 7000}] },
    { id: 16, name: "Disinfecting Building", price: 3800, rating: 4.8, type: "Floor Area", Unit: [{name: "5000sft", value: 1, price: 3800}, {name: "7000sft", value: 2, price: 5000}, {name: "10,000sft", value: 3, price: 7000}] }
  ]
];

app.get("/api/serviceCatagory", (req, res) => {
  res.json(serviceCatagory);
});



app.listen(9001, () => {
  console.log("Node server started on port 9001.");
});