import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import RocketLaunchesDetails from "./components/RocketLaunchesDetails";
import RingLoader from "react-spinners/RingLoader";
// import querystring from 'querystring';

function App() {
  const [filters, setFilters] = useState({
    launch_year: "",
    launch_success: "",
    land_success: "",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // const Year = [
  //   2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  //   2016, 2017, 2018, 2019, 2020
  // ];

  //Get The Array of Launch Year
  const uniqueLaunchYears = new Array(15)
    .fill(0)
    .map((_, index) => 2006 + index);

  function getUpdatedURL(filters) {
    return `https://api.spacexdata.com/v3/launches?limit=100&launch_year=${filters.launch_year}&launch_success=${filters.launch_success}&land_success=${filters.land_success}`;
  }

  const updateFilter = (e) => {
    const name = e.target.name;
    var value = e.target.value;
    if (filters[name] === value) {
      value = "";
    }

    setFilters({ ...filters, [name]: value });

    fetchAPI();
  };

  // const updateFilter = (type, values)=> {
  //    console.log(values);
  //    const E = values.target.value;
  //   setFilters({...filters, [type] : E});
  //   console.log(filters);
  // }

  const fetchAPI = async () => {
    const URL = getUpdatedURL(filters);
    console.log(filters);
    const res = await axios.get(URL);
    setData(res.data);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetchAPI();
  }, [filters]);

  return (
    <div className="App">
      {loading ? (
        <div className="Loader">
        <RingLoader
        color={"#00FF00"}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>

      ) : (
        <div>
          <h4 className="text-center">SpaceX Program</h4>
          <Container fluid>
            <Row>
              <Col md={6} lg={3}>
                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="App-filter-header">
                      Filters
                    </Card.Title>
                    <Card.Text className="App-filter-heading-launch-year">
                      Launch Year
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <Row>
                      <div className="App-filter-button-container">
                        {uniqueLaunchYears.map((item) => {
                          // console.log(item);
                          return (
                            <Button
                              variant={
                                filters.launch_year === item.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              className="App-filter-button"
                              value={item}
                              name="launch_year"
                              onClick={updateFilter}
                            >
                              {item}
                            </Button>
                          );
                        })}
                      </div>
                    </Row>

                    <Card.Text className="App-filter-heading">
                      Successful Launch
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <Row>
                      <div className="App-filter-button-container">
                        <Button
                          variant={
                            filters.launch_success === "true"
                              ? "success"
                              : "outline-success"
                          }
                          className="App-filter-button"
                          value={true}
                          name="launch_success"
                          onClick={updateFilter}
                        >
                          True
                        </Button>
                        <Button
                          variant={
                            filters.launch_success === "false"
                              ? "success"
                              : "outline-success"
                          }
                          className="App-filter-button"
                          value={false}
                          name="launch_success"
                          onClick={updateFilter}
                        >
                          False
                        </Button>
                      </div>
                    </Row>

                    <Card.Text className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <Row>
                      <div className="App-filter-button-container">
                        <Button
                          variant={
                            filters.land_success === "true"
                              ? "success"
                              : "outline-success"
                          }
                          className="App-filter-button"
                          value={true}
                          name="land_success"
                          onClick={updateFilter}
                        >
                          True
                        </Button>
                        <Button
                          variant={
                            filters.land_success === "false"
                              ? "success"
                              : "outline-success"
                          }
                          className="App-filter-button"
                          value={false}
                          name="land_success"
                          onClick={updateFilter}
                        >
                          False
                        </Button>
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {data.map((details) => {
                    return (
                      <Col md={12} lg={3}>
                        <RocketLaunchesDetails details={details} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default App;
