import { cleanEnv, str} from 'envalid'
import * as dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: str()
})

export default env;