import { gql } from 'apollo-server-koa';

export const polygonQuery = gql`
    type Query{
        polygons: [Polygon]
    }
    type Mutation{
        createPolygon(polygon: PolygonInput!): Polygon
        updatePolygon(id: String!, polygon: updatePolygonInput!): Polygon
        deletePolygon(id: String!): Polygon
    }
    type Subscription{
        polygonsChanged(realityId: Int!): Polygon
    }
`;

export const polygonInput = gql`
    input PolygonInput{
        name: String!,
        positions: [[Int!]!]!,
        height: Int!,
        comment: String,
        aids: [String]!,
        #        classification: [Mission]!,
        #        expirationDate: Date,
        internalMargins: Int,
        externalMargins: Int,
        fillColor: String,
        entityColor: String,
        #        borderStyle: BorderStyle,
        borderWidth: Int,
    }
`;

export const polygonType = gql`
    type Polygon implements CommonEntity{
        id: ID!
        name: String!,
        creationDate: String,
        lastUpdateDate: String,
        dataVersion: Int!,
        positions: [[Int!]],
        correlationId: String!,
        height: Int!,
        comment: String,
        aids: [String]!,
        #        classification: [Mission]!,
        #        expirationDate: Date,
        internalMargins,: Int,
        externalMargins,: Int,
        fillColor,: String,
        entityColor,: String,
        #        borderStyle: BorderStyle,
        borderWidth: Int,
    }
`;

export const updatePolygonType = gql`
    input updatePolygonInput{
        name: String,
        positions: [[Int!]!],
        height: Int,
        comment: String,
        aids: [String],
        #        classification: [Mission]!,
        #        expirationDate: Date,
        internalMargins: Int,
        externalMargins: Int,
        fillColor: String,
        entityColor: String,
        #        borderStyle: BorderStyle,
        borderWidth: Int,
    }
`;
