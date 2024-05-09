import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import axios from 'axios';
import { getOrder } from 'src/redux/orderSlice';
import { useSelector } from 'react-redux';

const CheckIfPaid = () => {

    // const [images, setImages] = useState([])

    // const [currentIndex, setCurrentIndex] = useState(0);
    const imageRef = useRef();

    const [image, setImage] = useState('')
    const [userInfos, setUserInfos] = useState([])

    const order = useSelector(getOrder)

    const fetchData = async () => {

        const creditUrl = process.env.NEXT_PUBLIC_API_URL + 'credit/';

        try {

            const resp = await axios.get(creditUrl);
            const credit = resp.data.find(cred => cred.orderId === order._id);
            setImage(process.env.NEXT_PUBLIC_API_URL + 'file/' + credit.receipt);

            setUserInfos({
                name: credit.userName,
                email: credit.userEmail,

            })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        fetchData();

    }, [])


    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `image_${image + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(`<img src="${image + 1}" style="max-width: 100%;" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };


    return (
        <div>

            <Grid container spacing={2}>
                {/* {images.map((image, key) => ( */}
                <Grid style={{ width: '100%' }} >
                    <Card style={{ width: '100%' }} >
                        <CardContent style={{ width: '100%' }} >
                            <CardMedia
                                style={{ height: 600, width: '100%', marginRight: 0, content: 'center' }}
                                component="img"
                                image={image}
                                sx={{ objectFit: "contain", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid spacing={2} sx={12} style={{ width: '100%' }}>
                    <Button variant="contained" color="primary" onClick={handleDownload}>
                        Download
                    </Button>

                    <Button variant="contained" color="secondary" onClick={handlePrint} style={{ marginLeft: '10px' }}>
                        Print
                    </Button>
                </Grid>
                {/* ))} */}
                {/* <Approve /> */}
            </Grid>
        </div>
    )
}

export default CheckIfPaid