import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const AddModal = ({ onClose, product, onUpdate }) => {
     const { register, handleSubmit, setValue } = useForm();

     React.useEffect(() => {
          if (product) {
               // Fill the form with product data for editing
               setValue("nomi", product.nomi);
               setValue("kelgannarxi", product.kelgannarxi);
               setValue("sotishnarxi", product.sotishnarxi);
               setValue("soni", product.soni);
               setValue("barcode", product.barcode);
          }
     }, [product, setValue]);

     const addOrUpdateData = (data) => {
          const request = product
               ? axios.put(`https://i-oziq-ovqat-backend.vercel.app/api/update/${product._id}`, data)
               : axios.post("https://i-oziq-ovqat-backend.vercel.app/api/add", data);

          request.then(response => {
               onClose(); // Close the modal after success
               onUpdate(); // Update the data
               console.log(product ? 'Продукт успешно обновлен!' : 'Продукт успешно добавлен!'); // Show notification
          })
               .catch(error => {
                    console.error(error);
                    console.log('Произошла ошибка!'); // Show error notification
               });
     };

     return (
          <Modal open={true} onClose={onClose}>
               <Box sx={styles.modalContent}>
                    <IconButton sx={styles.closeButton} onClick={onClose}>
                         <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" sx={styles.title}>
                         {product ? 'Редактировать продукт' : 'Добавить новый продукт'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(addOrUpdateData)} sx={styles.form}>
                         <TextField
                              label="Название"
                              variant="outlined"
                              fullWidth
                              {...register("nomi", { required: true })}
                              sx={styles.textField}
                         />
                         <TextField
                              label="Цена прибытия"
                              variant="outlined"
                              fullWidth
                              {...register("kelgannarxi", { required: true })}
                              sx={styles.textField}
                         />
                         <TextField
                              label="Цена продажи"
                              variant="outlined"
                              fullWidth
                              {...register("sotishnarxi", { required: true })}
                              sx={styles.textField}
                         />
                         <TextField
                              label="Количество"
                              variant="outlined"
                              fullWidth
                              {...register("soni", { required: true })}
                              sx={styles.textField}
                         />
                         <TextField
                              label="Штрих код"
                              variant="outlined"
                              fullWidth
                              type="number"
                              {...register("barcode", { required: true })}
                              sx={styles.textField}
                         />
                         <Button
                              type="submit"
                              variant="contained"
                              sx={styles.submitButton}
                         >
                              {product ? 'Обновить данные' : 'Отправить данные'}
                         </Button>
                    </Box>
               </Box>
          </Modal>
     );
};

const styles = {
     modalContent: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#E0F7FA', // Light cyan background
     },
     closeButton: {
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#004D40', // Dark teal
     },
     title: {
          mb: 2,
          color: '#00796B', // Teal color
     },
     form: {
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
     },
     textField: {
          '& label.Mui-focused': {
               color: '#2C3E50', // Change label color on focus
          },
          '& .MuiOutlinedInput-root': {
               '& fieldset': {
                    borderColor: '#2C3E50', // Default border color
               },
               '&:hover fieldset': {
                    borderColor: '#2C3E50', // Border color on hover
               },
               '&.Mui-focused fieldset': {
                    borderColor: '#2C3E50', // Border color when focused
               },
          },
     },
     submitButton: {
          mt: 3,
          backgroundColor: '#00796B', // Teal
          '&:hover': {
               backgroundColor: '#004D40', // Dark teal
          },
          borderRadius: 2,
     }
};

export default AddModal;
