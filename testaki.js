const axios = require("axios");

callNer = async function() {
  const resp = await axios.post("http://localhost:5000/NER/", {
    payload: [
      {
        text:
          "I am Nikolaos Dimos, a senior software engineer with a diverse background. I have studied Computer science at National Technical University of Athens and did my Masters at Imperial College London. Now I am working as a full time employee for Workable an HR company as a Senior Engineer. My skills include java, javascript, nodejs and microservices. I am results driven individual with a lot of experience in building new products with the right tools. Finally my new love is maching learning and especially applied machine learning in medical imaging"
      }
    ]
  });

  const respMatching = await axios.post("http://localhost:5000/matching/", {
    candidate: resp.data.response[0],
    job: {
      education_entries: [
        { degree: "MSc", field_of_study: "Computer Science" }
      ],
      work_experiences: [{ title: "Data Scientist" }],
      technical_skills: ["Java", "C++", "Git", "Spark"],
      soft_skills: ["communication", "attention to detail"]
    }
  });
  console.log(JSON.stringify(respMatching.data));
};

callNer();
