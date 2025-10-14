const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");

const createItem = (req, res, next) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).json({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).json(items))
    .catch(next);
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).json({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError(err.message));
      }
     return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(err.message));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
     return next(err);
    });
  }

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((itemFound) => {
      if (itemFound.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You cannot delete this item");
      }

      return ClothingItem.findByIdAndDelete(itemId)
        .orFail(() => new NotFoundError("Item not found"))
        .then((item) => res.status(200).json({ data: item }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError(err.message));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(err.message));
      }
      return next(err);
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
