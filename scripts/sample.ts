import { display } from './server/matrixled';

const value = process.argv[2];
if (!value) {
    console.log('You must provide a text in argument!')
    process.exit(1)
} else {
    display(process.argv[2]);
}
