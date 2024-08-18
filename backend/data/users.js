import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('ayuman', 10),
        isAdmin: true,
    },
    {
        name: 'Ayele Gobezie',
        email: 'ayele.gobezie@gmail.com',
        password: bcrypt.hashSync('ayuman', 10),
        isAdmin: false,
    },
    {
        name: 'Ayele Gobezie',
        email: 'ayele.gobezie@gmail.com',
        password: bcrypt.hashSync('ayuman', 10),
        isAdmin: false,
    }
];
export default users;