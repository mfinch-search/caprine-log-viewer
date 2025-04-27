import "@testing-library/jest-dom";
import 'jest-canvas-mock';
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TextDecoderStream, TextEncoderStream } from 'node:stream/web';

Object.assign(global, { TextDecoder, TextEncoder, TextDecoderStream, TextEncoderStream, ReadableStream });