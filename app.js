const http = require('http');
const queryString = require('query-string'); 
const url = require('url')
const fs = require('fs')

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req, res) => {

    var answer;
    const urlparse = url.parse(req.url, true)
    const params = queryString.parse(urlparse.search);

    // Creating a User - Update a User
    if(urlparse.pathname == '/create-and-upload-an-user'){
        //Have the informations of the users
        const params = queryString.parse(urlparse.search);
      

        //Save the informations of the users
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Saved!');

            answer = 'User created with sucess'

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(answer);
          });

    } 
    //Select an User
    else if(urlparse.pathname == '/select-an-user') {
        fs.readFile('users/' + params.id + '.txt', function(err, data) {
            answer = data; 

                
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(answer);
        });
    }
    //Delete an User
    else if(urlparse.pathname == '/delete-an-user') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
            console.log('File deleted!');

            answer = err ? 'We can\'t find the user' : 'User deleted'

            res.statusCode = 204;
            res.setHeader('Content-Type', 'text/plain');
            res.end(answer);
        });
    }

});

server.listen(port, hostname), () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
};