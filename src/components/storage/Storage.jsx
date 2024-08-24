import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Pagination } from '@mui/material';

const Storage = () => {
    const [soldItems, setSoldItems] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Количество продуктов на странице

    useEffect(() => {
        axios.get("https://i-oziq-ovqat-backend.vercel.app/api/sold-items")
            .then(response => {
                setSoldItems(response.data);
                const profit = response.data.reduce((sum, item) => {
                    const itemProfit = (item.sotishnarxi - item.kelgannarxi) * item.soni;
                    return sum + itemProfit;
                }, 0);
                setTotalProfit(profit);
            })
            .catch(error => {
                console.log("Ошибка при получении проданных товаров", error);
            });
    }, []);

    // Логика для определения продуктов, которые будут отображаться на текущей странице
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = soldItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: -1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Проданные товары
                </Typography>
                <Box sx={{ marginBottom: 2, padding: 2, backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
                    <Typography variant="h5">
                        Общий чистый доход: <strong>{totalProfit}</strong> ₽
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Название продукта</TableCell>
                                <TableCell>Цена прибытия</TableCell>
                                <TableCell>Цена продажи</TableCell>
                                <TableCell>Количество</TableCell>
                                <TableCell>Дата продажи</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#2c3e5025',
                                            '& > *': {
                                                color: '#ffffff',
                                            },
                                        },
                                    }}
                                >
                                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                                    <TableCell>{item.nomi}</TableCell>
                                    <TableCell>{item.kelgannarxi} ₽</TableCell>
                                    <TableCell>{item.sotishnarxi} ₽</TableCell>
                                    <TableCell>{item.soni}</TableCell>
                                    <TableCell>{new Date(item.saleDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Пагинация */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                    <Pagination
                        count={Math.ceil(soldItems.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                '&:hover': {
                                    backgroundColor: '#2C3E50',
                                    color: '#ffffff',
                                },
                            },
                            '& .Mui-selected': {
                                backgroundColor: '#2C3E50 !important',
                                color: '#ffffff',
                            }
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Storage;
