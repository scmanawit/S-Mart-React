import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "@mui/material";

export default function ShopsList({ shops }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const accordion = () => {
        return shops.map(shop => {
            return (
                <Accordion key={shop._id} expanded={expanded === shop._id} onChange={handleChange(shop._id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {shop.shopName}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{shop.description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                            Aliquam eget maximus est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )
        })
    }

    return (
        <div>
            {accordion()}
        </div>
    );
}