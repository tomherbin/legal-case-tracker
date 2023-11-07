const mongoose = require("mongoose");
const Case = require("../models/Case");

mongoose.connect("mongodb://localhost:27017/legal-case-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");

  const sampleCases = [
    {
      title: "Trademark Infringement",
      description:
        "A local bakery has been accused of using a logo that is strikingly similar to a national brand. The competitor claims this has caused confusion among customers and diluted their brand value. Our legal team is tasked with investigating the claim and preparing a defense strategy. We are currently collecting evidence of the logo's originality and its usage in commerce.",
      status: "Open",
      summary: "Investigating potential infringement and gathering evidence.",
    },
    {
      title: "Breach of Contract",
      description:
        "A supplier failed to deliver the agreed-upon quantity of goods within the stipulated timeframe, causing significant losses. The client is seeking compensation for the breach as well as fulfillment of the original contract terms. Our firm is preparing to enter pre-trial negotiations with the aim of reaching an amicable settlement. If negotiations fail, we are ready to pursue litigation.",
      status: "In Progress",
      summary: "Preparing for pre-trial negotiations and possible litigation.",
    },
    {
      title: "Personal Injury Claim",
      description:
        "The client was involved in a workplace accident due to alleged negligence by the employer. As a result, the client has sustained multiple injuries leading to loss of income and ongoing medical expenses. We are in the process of gathering medical records and witness testimonies to build a strong compensation claim. The goal is to secure a settlement that covers all medical costs and compensates for pain and suffering.",
      status: "Open",
      summary: "Compiling evidence for a strong compensation claim.",
    },
    {
      title: "Divorce Proceedings",
      description:
        "The dissolution of a decade-long marriage involving complex asset division and custody disputes is underway. Both parties are seeking a fair division of property and a custody arrangement that serves the best interest of the children. Mediation sessions are being conducted to reach a mutual agreement without resorting to a court trial. Our team is providing legal counsel and representation throughout the process.",
      status: "In Progress",
      summary:
        "Facilitating mediation and negotiation for asset division and custody.",
    },
    {
      title: "Property Dispute",
      description:
        "A dispute over the boundary line between two neighboring properties has escalated after recent construction work. The client claims that the neighbor has encroached on their property, violating local zoning laws. After several rounds of discussion, the matter was resolved through arbitration, with both parties agreeing to a new boundary line. The resolution included compensation for the encroached land and restoration costs.",
      status: "Closed",
      summary: "Resolved boundary dispute through arbitration.",
    },
    {
      title: "Estate Planning",
      description:
        "Our client is looking to secure their family's financial future by establishing a comprehensive estate plan. This includes drafting a will, setting up trusts, and ensuring that the estate is managed according to their wishes. The initial consultation has been completed, and we are now in the process of drafting the necessary legal documents. The plan will also include measures to minimize estate taxes and facilitate the probate process.",
      status: "Open",
      summary:
        "Drafting legal documents for estate management and tax planning.",
    },
    {
      title: "Product Liability Case",
      description:
        "A defective product has caused serious injury to our client, prompting a product liability lawsuit against the manufacturer. We are currently conducting product tests to establish the defect and its link to the injury sustained. Expert consultations are underway to strengthen the client's claim for compensation. The case aims to hold the manufacturer accountable and prevent future harm to consumers.",
      status: "Open",
      summary: "Establishing product defect and causation for injury.",
    },
    {
      title: "Employment Discrimination",
      description:
        "An employee has alleged discrimination based on their race, which has reportedly affected their career progression. Our firm is reviewing the company's employment policies and the employe's records to determine any discrepancies or biases in treatment. We are also interviewing other employees to understand the workplace culture and gather additional evidence. The aim is to resolve the matter through internal mediation or, if necessary, legal action.",
      status: "In Progress",
      summary: "Investigating claims of workplace discrimination.",
    },
    {
      title: "Real Estate Transaction",
      description:
        "Our client is engaged in the purchase of a commercial property, which involves a series of complex negotiations and legal checks. The transaction process includes due diligence on the property's title, zoning compliance, and environmental assessments. After successful negotiations, the purchase was completed, and all legal documents were duly recorded. Our firm facilitated the entire process, ensuring a smooth transfer of ownership.",
      status: "Closed",
      summary: "Completed commercial property acquisition.",
    },
    {
      title: "Intellectual Property Rights",
      description:
        "A new invention has sparked interest from several parties looking to obtain licensing rights. We are negotiating the terms of the licensing agreement to ensure that our client's intellectual property is adequately protected and compensated. The discussions include royalty arrangements, usage rights, and protection against unauthorized distribution. The goal is to finalize a mutually beneficial agreement that fosters innovation while safeguarding intellectual property.",
      status: "Open",
      summary:
        "Drafting and negotiating intellectual property licensing terms.",
    },
  ];

  // Insert the sample cases into the database
  Case.insertMany(sampleCases)
    .then(() => {
      console.log("Sample legal cases have been inserted");
      mongoose.connection.close(); // Close the connection after insertion
    })
    .catch((error) => {
      console.error("Error inserting sample cases:", error);
      mongoose.connection.close(); // Close the connection in case of error as well
    });
});
