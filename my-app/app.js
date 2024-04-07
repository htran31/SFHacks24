const express = require('express');
const axios = require('axios'); 
const fs = require('fs');
const app = express();
app.use(express.json());



// app.get('/', async(req, res) => {
//     try {
//         const result = await getResponse();
//         const content = result.choices[0].message.content;
//         // Read the HTML file
//         fs.readFile('home.html', 'utf8', (err, data) => {
//           if (err) {
//               // Handle file read error
//               console.error('Error reading HTML file:', err);
//               res.status(500).send('Error loading HTML file');
//               return;
//           }
//           // Replace the placeholder with the content
//           const htmlContent = data.replace('{{content}}', content);
//         //   Send the modified HTML content to the browser
//           res.send(htmlContent);
//       });

//         console.log(result);
//         res.send(result);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message);
//     }
// });


app.post('/sendVariable', async (req, res) => {
    console.log('I am in app.post');
    const base64Output = req.body.variable;
    console.log('Received variable:',base64Output );
    // Do something with the received variable
    res.send('Variable received successfully!');
    try {
        const result = await getResponse(base64Output);
        const content = result.choices[0].message.content;
        // Read the HTML file
        fs.readFile('home.html', 'utf8', (err, data) => {
          if (err) {
              // Handle file read error
              console.error('Error reading HTML file:', err);
              res.status(500).send('Error loading HTML file');
              return;
          }
          // Replace the placeholder with the content
          const htmlContent = data.replace('{{content}}', content);
          // Send the modified HTML content to the browser
          res.send(htmlContent);
      });
    const resultTag = document.getElementById("result");
    console.log(resultTag);


        // console.log(result);
        // res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

async function getResponse(imgUrl) {
    try {
        const response = await axios.post('https://api.fireworks.ai/inference/v1/chat/completions', {
            model: "accounts/fireworks/models/firellava-13b",
            max_tokens: 512,
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            temperature: 0.6,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "answer in one word what option of this trash object (composed, recycle, landfill, or hazardous-waste)"
                        },
                        {
                            type: "image_url",
                            image_url: {
                                  url: imgUrl
                  }
                        }
                    ]
                }
            ]
        }, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': `Bearer S1m4uyIybO6L8SzvTr0j0OHsKIMGj2vPx63jkGOg3K2jzZlp`
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

app.listen(3000, () => {
    console.log("Server is listening at 3000");
});

module.exports = app;



