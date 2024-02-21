const jwt = require('jsonwebtoken');

const secret = 'MyLlaveSecreta';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwODE2MDcxMX0.HfMsQLM0uLbBt58A2G3AZrP1hq-zDbTR3kSHfGK6_po';

function verifyToken(token, secret){
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
