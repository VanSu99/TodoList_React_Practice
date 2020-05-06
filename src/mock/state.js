import { v4 as uuidv4 } from 'uuid';

console.log(localStorage.getItem())

export default [
    {
        id: uuidv4(),
        name: 'Hoc lap trinh python',
        level: 0 // small
    },
    {
        id: uuidv4(),
        name: 'Hoc lap trinh javascript',
        level: 1 // medium
    },
    {
        id: uuidv4(),
        name: 'Hoc lap trinh C#',
        level: 2 // high
    },
    {
        id: uuidv4(),
        name: 'Cau truc du lieu & Giai thuat',
        level: 0
    }
]