import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
export default class BlogList extends Component {
  state = {
    posts: [],
  };

  componentDidMount = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts");

      if (response.ok) {
        const data = await response.json();

        this.setState({
          posts: data,
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
