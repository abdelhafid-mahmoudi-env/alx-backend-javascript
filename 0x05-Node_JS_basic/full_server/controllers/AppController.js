/**
 * Contains the miscellaneous route handlers.
 * @author Abdelhafid Mahmoudi <https://github.com/abdelhafid-mahmoudi-env>
 */
class AppController {
  static getHomepage(request, response) {
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
module.exports = AppController;
