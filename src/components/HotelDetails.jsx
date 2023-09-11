import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import BookingForm from "./BookingForm";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const fetchHotel = async (id) => {
  const response = await fetch(`http://localhost:3001/hotels/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const HotelDetails = () => {
  const [match, params] = useRoute("/hotel/:id");
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => fetchHotel(params.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Hotel! {error.message}</div>;
  }

  if (!match) {
    return <div>No se encontró el hotel.</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h3" component="h1" className="TituloApp">
        Booking Reservation
      </Typography>
      <div style={{ marginTop: "2rem" }}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 345, backgroundColor: "#cbcbcb" }}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={hotel.image}
            title={hotel.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {hotel.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hotel.description}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <BookingForm />
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default HotelDetails;
