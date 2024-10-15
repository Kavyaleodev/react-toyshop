import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <div>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\images\slider2.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\images\silder1.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="\images\slider3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <div>
        <center><h1 className='h1'>Featured</h1><h4>Products</h4></center>
    </div>
</div>
  );
}

export default DarkVariantExample;