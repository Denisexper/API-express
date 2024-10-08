const express = require('express'); 
const app = express();

app.use(express.json());

const students = [
    { id: 1, name: 'John', age: 20, enroll: true },
    { id: 2, name: 'Jane', age: 21, enroll: false},
    { id: 3, name: 'Bob', age: 19, enroll: true},
];

app.get('/', (req, res)=>{
    res.send('Nodejs api');
});

app.get('/api/student',(req, res)=>{
    res.send(students);
});

app.get('/api/students/:id',(req, res)=>{
    const student =  students.find((student) => student.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado')
    else res.send(student);

});

app.post('/api/student',(req, res)=>{
    const student = {
        id: students.length +  1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')

    };
    students.push(student)
    res.send(student);
});

app.delete('/api/student/:id',(req, res) => {
    
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('no encontrado');
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 80;
app.listen(port,()=> console.log(`Escuchando en el puerto ${port}...`))