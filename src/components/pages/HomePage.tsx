import { Stack, Typography } from "@mui/material";
import { FC } from "react";

 
const Home: FC = () => {
    return ( 
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Typography variant="h1" marginBottom="40px" sx={{ color: "text.primary" }}>
                dPRIME Asset
            </Typography>
            <Typography variant="h1" marginBottom="40px" sx={{ color: "text.primary" }}>
                Modules
            </Typography>
        </Stack>
     );
}
 
export default Home;