import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required(),
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");
   
export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const ClubSpec = Joi.object()
.keys({
  name: Joi.string().example("Waterford City RFC").required(),
  address: Joi.string().example("Cork Road, Waterford").required(),
  phone: Joi.string().example("0869874563").allow("").optional(),
  email: Joi.string().example("info@waterfordrfc.ie").allow("").optional(),
  website: Joi.string().example("http://www.waterfordrfc.ie").allow("").optional(),
  latitude: Joi.number().example("52.2386926").required(),
  longitude: Joi.number().example("-7.1403204").required(),
  countyid: IdSpec,
})
.label("Club");

export const ClubSpecPlus = ClubSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ClubPlus");

export const ClubArraySpec = Joi.array().items(ClubSpecPlus).label("ClubArray");

// export const ClubSpec = {
//   name: Joi.string().required(),
//   address: Joi.string().required(),
//   phone: Joi.string().allow("").optional(),
//   email: Joi.string().allow("").optional(),
//   website: Joi.string().allow("").optional(),
//   latitude: Joi.number().required(),
//   longitude: Joi.number().required(),
// };

export const CountySpec = Joi.object()
.keys({
  county: Joi.string().example("Waterford").required(),
  userid: IdSpec,
  clubs: ClubArraySpec,
})
.label("County");

export const CountySpecPlus = CountySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaylistPlus");

export const CountyArraySpec = Joi.array().items(CountySpecPlus).label("CountyArray");
