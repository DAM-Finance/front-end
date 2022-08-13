import { Stack, Typography } from "@mui/material";
import { FC } from "react";


const NotFound: FC = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Typography variant="h1" fontWeight="bold" sx={{ color: "text.primary" }}>
                404
            </Typography>
            <Typography variant="h6" marginBottom="40px" sx={{ color: "text.primary" }}>
                PAGE NOT FOUND
            </Typography>
        </Stack>
    );
}

export default NotFound;