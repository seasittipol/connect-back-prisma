const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

//  DROP DATABASE
//  echo 'drop database cc16_connect' | pnpm prisma db execute --stdin

const hashPassword = bcrypt.hashSync('123456', 10)

const teacherData = [
    { firstname: 'Andy', t_code: 't001', password: hashPassword, email: 'andy@ggg.mail' },
    { firstname: 'Bobby', t_code: 't002', password: hashPassword, email: 'andy@ggg.mail' },
    { firstname: 'Cobby', t_code: 't003', password: hashPassword, email: 'andy@ggg.mail' },
    { firstname: 'Dobby', t_code: 't004', password: hashPassword, email: 'andy@ggg.mail' },
]

const subjectData = [
    { title: 'HTML', description: 'Write web page' },
    { title: 'CSS', description: 'Style web page' },
    { title: 'JS', description: 'Dynamic web page' },
]

async function run() {
    await prisma.teacher.createMany({ data: teacherData })
    await prisma.subject.createMany({ data: subjectData })
}

run()