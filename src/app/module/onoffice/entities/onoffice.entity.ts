import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OnofficeDocument = HydratedDocument<Onoffice>;

@Schema({ timestamps: true })
export class Onoffice {
  @Prop({ required: true, unique: true })
  onofficeId!: number;

  @Prop({ unique: true, sparse: true })
  slug!: string;

  @Prop({ default: '' })
  objekttitel!: string;

  @Prop({ default: '' })
  objektbeschreibung!: string;

  @Prop({ default: '' })
  lage!: string;

  @Prop({ default: '' })
  ausstatt_beschr!: string;

  // Numeric fields
  @Prop({ default: 0 })
  wohnflaeche!: number;

  @Prop({ default: 0 })
  anzahl_zimmer!: number;

  @Prop({ default: 0 })
  anzahl_badezimmer!: number;

  @Prop({ default: 0 })
  anzahl_schlafzimmer!: number;

  @Prop({ default: 0 })
  kaltmiete!: number;

  @Prop({ default: 0 })
  warmmiete!: number;

  @Prop({ default: 0 })
  kaufpreis!: number;

  @Prop({ default: 0 })
  kaution!: number;

  @Prop({ default: 0 })
  nebenkosten!: number;

  @Prop({ default: '' })
  vermarktungsart!: string;

  @Prop({ default: '' })
  objektart!: string;

  @Prop({ default: '' })
  objekttyp!: string;

  // Address
  @Prop({ default: '' })
  ort!: string;

  @Prop({ default: '' })
  plz!: string;

  @Prop({ default: '' })
  strasse!: string;

  @Prop({ default: '' })
  hausnummer!: string;

  @Prop({ default: '' })
  stadtteil!: string;

  // Coordinates as numbers for map
  @Prop({ default: null, type: Number })
  breitengrad!: number | null;

  @Prop({ default: null, type: Number })
  laengengrad!: number | null;

  // Features
  @Prop({ default: '' })
  balkon!: string;

  @Prop({ default: '' })
  terrasse!: string;

  @Prop({ default: '' })
  fahrstuhl!: string;

  @Prop({ default: '' })
  moebliert!: string;

  @Prop({ default: '' })
  haustiere!: string;

  @Prop({ default: '' })
  status!: string;

  @Prop({ default: '' })
  veroeffentlichen!: string;

  @Prop({ type: Date, default: null })
  verfuegbar_ab!: Date | null;

  // Admin-managed extras (not from CRM)
  @Prop({ default: '' })
  minimumStay!: string;

  @Prop({ type: Object, default: {} })
  amenities?: {
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
  whyChoose!: string[];

  @Prop({ type: [Object], default: [] })
  locationHighlights!: {
    label: string;
    distance: string;
  }[];

  // Images from CRM
  @Prop({ type: [Object], default: [] })
  images?: {
    id: number;
    type: string;
    url: string;
    title: string;
  }[];

  @Prop({ type: Object, default: null })
  titleImage?: {
    id: number;
    type: string;
    url: string;
    title: string;
  } | null;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop()
  syncedAt!: Date;
}

export const OnofficeSchema = SchemaFactory.createForClass(Onoffice);

// 2dsphere index for map bounding-box queries
OnofficeSchema.index({ breitengrad: 1, laengengrad: 1 });
OnofficeSchema.index({ isActive: 1 });
OnofficeSchema.index({ stadtteil: 1 });
OnofficeSchema.index({ kaltmiete: 1 });
OnofficeSchema.index({ anzahl_zimmer: 1 });
