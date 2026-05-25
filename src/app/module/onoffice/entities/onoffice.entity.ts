import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OnofficeDocument = HydratedDocument<Onoffice>;

@Schema({ timestamps: true })
export class Onoffice {
  @Prop({ required: true, unique: true })
  onofficeId: number;

  @Prop({ default: '' })
  objekttitel: string;

  @Prop({ default: '' })
  objektbeschreibung: string;

  @Prop({ default: '' })
  lage: string;

  @Prop({ default: '' })
  wohnflaeche: string;

  @Prop({ default: '' })
  anzahl_zimmer: string;

  @Prop({ default: '' })
  anzahl_badezimmer: string;

  @Prop({ default: '' })
  kaltmiete: string;

  @Prop({ default: '' })
  warmmiete: string;

  @Prop({ default: '' })
  kaufpreis: string;

  @Prop({ default: '' })
  vermarktungsart: string;

  @Prop({ default: '' })
  objektart: string;

  @Prop({ default: '' })
  ort: string;

  @Prop({ default: '' })
  plz: string;

  @Prop({ default: '' })
  strasse: string;

  @Prop({ default: '' })
  hausnummer: string;

  @Prop({ default: '' })
  breitengrad: string;

  @Prop({ default: '' })
  laengengrad: string;

  @Prop({ default: '' })
  balkon: string;

  @Prop({ default: '' })
  terrasse: string;

  @Prop({ type: String, default: '' })
  fahrstuhl: string;

  @Prop({ default: '' })
  status: string;

  @Prop({ default: '' })
  veroeffentlichen: string;

  @Prop({ default: '' })
  availableFrom: string;

  @Prop({ default: '' })
  minimumStay: string;

  @Prop({ default: '' })
  deposit: string;

  @Prop({ default: '' })
  serviceFee: string;

  @Prop({ type: Object, default: {} })
  amenities: {
    furnished: boolean;
    transportationParking: boolean;
    wifi: boolean;
    elevator: boolean;
    fittedKitchen: boolean;
    emergencyAlertSystem: boolean;
    moveInCoordination: boolean;
    mealPreparationService: boolean;
    petFriendly: boolean;
    balcony: boolean;
  };

  @Prop({ type: [String], default: [] })
  whyChoose: string[];

  @Prop({ type: [Object], default: [] })
  locationHighlights: {
    label: string;
    distance: string;
  }[];

  @Prop({ type: [Object], default: [] })
  images: {
    id: number;
    type: string;
    url: string;
    title: string;
  }[];

  @Prop({ type: Object, default: null })
  titleImage: {
    id: number;
    type: string;
    url: string;
    title: string;
  } | null;

  @Prop()
  syncedAt: Date;
}

export const OnofficeSchema = SchemaFactory.createForClass(Onoffice);