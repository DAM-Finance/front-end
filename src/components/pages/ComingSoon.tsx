import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const ComingSoon: FC = () => {
    return ( 
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Typography variant="h1" marginBottom="40px" sx={{ color: "text.primary" }}>
                Coming Soon
            </Typography>
        </Stack>
     );
}
 
export default ComingSoon;