# Two-factor authentication app
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)](https://knowyourplant.herokuapp.com)
[https://knowyourplant.herokuapp.com](https://knowyourplant.herokuapp.com)<br/>
### Author: Van Nguyen

The idea of the app changed quite a few times before comming up with the final idea which is the implementation of a plant identify app. Authentication system is also a major feature of this app (sign up, log in, two-factor authentication)

With the amazing Plant.id api and their machine learning algorithm, this app allows users to identify what kind of plant they are seeing by getting an image input. The result is the possibility of the plant type and their information. The history search is stored in database and will display to user when they request.

This app follows these technical thingy:
- MVC pattern
- Token auth with JWT
- Two-factor authentication
- Plant id api
- Material UI
- CSS flexbox
- MongoDB
- Heroku

The app is not perfect version, therefore, there is a todo list: 
- Recovery password, recovery code for 2fa
- Clear instruction for 2fa
- If scale up, testing, dockerize, proper type-check is necessary
- Optimize image to base64 or such format
