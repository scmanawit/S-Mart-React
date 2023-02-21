import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUnverifiedShops, verifyShop } from '../services/shopService';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function VerifyShops() {

    const context = useOutletContext()

    const [unverifiedShops, setUnverifiedShops] = useState([]);

    useEffect(() => {
        getUnverifiedShops()
            .then(data => {
                setUnverifiedShops(data)
            })
    }, [])

    const verify = async (shopId) => {
        try {
            await verifyShop(shopId)
            await Swal.fire({
                title: "Shop Successfully verified!",
                icon: "success"
            })
            const shops = await getUnverifiedShops()
            setUnverifiedShops(shops)
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }
    }
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, pl: 500 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Shops to verify</StyledTableCell>
                        <StyledTableCell align="right">Shop Name</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="right">Date Created</StyledTableCell>
                        <StyledTableCell align="right"> Verify </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {unverifiedShops.map((shop) => (
                        <StyledTableRow key={shop._id}>
                            <StyledTableCell component="th" scope="row">
                                {shop._id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{shop.shopName}</StyledTableCell>
                            <StyledTableCell align="right">{shop.description}</StyledTableCell>
                            <StyledTableCell align="right">{shop.createdAt}</StyledTableCell>
                            <StyledTableCell align="right" >
                                <Button variant="outlined" onClick={() => (verify(shop._id))}>Verify</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    // })

}


