import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOrderHistory } from '../services/orderService';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';


export default function OrderHistory() {
  const context = useOutletContext()

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    getOrderHistory()
      .then(data => {
        setOrderHistory(data)
      })
  }, [])


  const products = (history) => {
    const products = history?.products || []
    return products.map((product, i) => {
      return (
        <TableRow key={i}>
          <TableCell>{product.product.productName}</TableCell>
          <TableCell align="right">{product.quantity}</TableCell>
          <TableCell align="right">{product.product.price}</TableCell>
          <TableCell align="right">{product.subTotal}</TableCell>
        </TableRow>
      )
    })
  }

  const history = () => {
    return orderHistory.map(order => {
      return (
        <Box component='div' key={order._id} sx={{ mt: '40px', mb: '20px', pl: '50px', pr: '50px' }}>
          <TableContainer component={Paper} sx={{ pl: '20' }}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"><h1><strong>Transaction Date:</strong></h1>

                  </TableCell>
                  <TableCell align="right" colSpan={3}><h2><strong>{order.transactionDate}</strong></h2></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Sub Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products(order)}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}><h3><strong>Total</strong></h3></TableCell>
                  <TableCell align="right">{order.total}</TableCell>
                </TableRow>


              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    })
  }

  return (
    <Box component='div' sx={{ ...context.sx }}>
      <Toolbar />
      {history()}
    </Box>
  )

}
