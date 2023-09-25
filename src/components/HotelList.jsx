import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fetch al 3001 donde esta el server (La bbdd del server esta en el archivo db.json)
const fetchHotels = async () => {
  const response = await fetch("http://localhost:3001/hotels");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const HotelList = () => {
  const windowWidth = window.innerWidth;
  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery({ queryKey: ["hotels"], queryFn: fetchHotels });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Hotels! {error.message}</div>;
  }

  const getSlidesToShow = () => {
    if (windowWidth < 600) {
      return 2;
    } else {
      return 3;
    }
  };

  const getSlidesToScroll = () => {
    const slidesToShow = getSlidesToShow(); // Obtenemos la cantidad de elementos a mostrar
    const totalHotels = hotels.length; // Obtenemos la cantidad total de hoteles

    // Establecemos slidesToScroll en la cantidad mínima entre slidesToShow y totalHotels
    return Math.min(slidesToShow, totalHotels);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: getSlidesToScroll(),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h3" component="h1" className="TituloApp">
          Booking App
        </Typography>
      </div>
      <br />
      <br />
      <div className="hotelCarrusel">
        <Slider {...sliderSettings} className="slider">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotelCarrusel__item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Link href={`/hotel/${hotel.id}`}>
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
                    <CardActions>
                      <Button size="small">See Details</Button>
                    </CardActions>
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HotelList;
