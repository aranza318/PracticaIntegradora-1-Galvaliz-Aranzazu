import messageModel from "../models/message.model.js"

export default class MessagesManager {
    //Consigue los mensajes
    getMessages = async () => {
      try {
        return await messageModel.find().lean().exec();
      } catch (error) {
        return error;
      }
    }
    //Crea los mensajes segun el modelo
    createMessage = async (message) => {
      try {
        return await messageModel.create(message);
      } catch (error) {
        return error;
      }
    }
  }