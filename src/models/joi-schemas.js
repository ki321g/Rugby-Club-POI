import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  accountType: Joi.string().example("user").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const GameSpec = Joi.object()
  .keys({
    home: Joi.string().example("Waterford City RFC").required(),
    homescore: Joi.number().example("12").required(),
    awayscore: Joi.number().example("10").required(),
    away: Joi.string().example("Tramore RFC").required(),
    gametime: Joi.string().example("Some time").required(),
    gamelocation: Joi.string().example("Waterford").required(),
    clubid: IdSpec,
  })
  .label("Game");

export const GameSpecPlus = GameSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("GamePlus");

export const GameArraySpec = Joi.array().items(GameSpecPlus).label("GameArray");

export const ClubSpec = Joi.object()
  .keys({
    club: Joi.string().example("Waterford City RFC").required(),
    address: Joi.string().example("Waterford").required(),
    phone: Joi.string().example("0869874563").allow("").optional(),
    email: Joi.string().example("info@waterfordrfc.ie").allow("").optional(),
    website: Joi.string().example("http://www.waterfordrfc.ie").allow("").optional(),
    latitude: Joi.number().example("52.2386926").required(),
    longitude: Joi.number().example("-7.1403204").required(),
    description: Joi.string().example("A great rugby club").allow("").optional(),
    category: Joi.string().example("Senior").required(),
    userId: IdSpec,
  })
  .label("Club");

export const ClubSpecPlus = ClubSpec.keys({
  // userId: IdSpec,
  _id: IdSpec,
  __v: Joi.number(),
}).label("ClubPlus");

export const ClubArraySpec = Joi.array().items(ClubSpecPlus).label("ClubArray");

export const JwtAuth = Joi.object()
  .keys({    
  _id: IdSpec.example("5f8f4b3b3f4b3f4b3f4b3f4b").required(),
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");