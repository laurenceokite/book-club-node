import express from 'express';
import apiRoutes from './controllers';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`)) 
