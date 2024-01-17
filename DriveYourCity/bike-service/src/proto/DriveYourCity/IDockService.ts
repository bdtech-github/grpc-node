// Original file: ../proto/Dock.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateDockRequest as _DriveYourCity_CreateDockRequest, CreateDockRequest__Output as _DriveYourCity_CreateDockRequest__Output } from './CreateDockRequest';
import type { DockResponse as _DriveYourCity_DockResponse, DockResponse__Output as _DriveYourCity_DockResponse__Output } from './DockResponse';
import type { GetAllDocks as _DriveYourCity_GetAllDocks, GetAllDocks__Output as _DriveYourCity_GetAllDocks__Output } from './GetAllDocks';
import type { GetDockByIdRequest as _DriveYourCity_GetDockByIdRequest, GetDockByIdRequest__Output as _DriveYourCity_GetDockByIdRequest__Output } from './GetDockByIdRequest';

export interface IDockServiceClient extends grpc.Client {
  CreateDock(argument: _DriveYourCity_CreateDockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  CreateDock(argument: _DriveYourCity_CreateDockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  CreateDock(argument: _DriveYourCity_CreateDockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  CreateDock(argument: _DriveYourCity_CreateDockRequest, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  createDock(argument: _DriveYourCity_CreateDockRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  createDock(argument: _DriveYourCity_CreateDockRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  createDock(argument: _DriveYourCity_CreateDockRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  createDock(argument: _DriveYourCity_CreateDockRequest, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  
  GetAllDocks(argument: _DriveYourCity_GetAllDocks, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_DriveYourCity_DockResponse__Output>;
  GetAllDocks(argument: _DriveYourCity_GetAllDocks, options?: grpc.CallOptions): grpc.ClientReadableStream<_DriveYourCity_DockResponse__Output>;
  getAllDocks(argument: _DriveYourCity_GetAllDocks, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_DriveYourCity_DockResponse__Output>;
  getAllDocks(argument: _DriveYourCity_GetAllDocks, options?: grpc.CallOptions): grpc.ClientReadableStream<_DriveYourCity_DockResponse__Output>;
  
  GetDockById(argument: _DriveYourCity_GetDockByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  GetDockById(argument: _DriveYourCity_GetDockByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  GetDockById(argument: _DriveYourCity_GetDockByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  GetDockById(argument: _DriveYourCity_GetDockByIdRequest, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  getDockById(argument: _DriveYourCity_GetDockByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  getDockById(argument: _DriveYourCity_GetDockByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  getDockById(argument: _DriveYourCity_GetDockByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  getDockById(argument: _DriveYourCity_GetDockByIdRequest, callback: grpc.requestCallback<_DriveYourCity_DockResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface IDockServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateDock: grpc.handleUnaryCall<_DriveYourCity_CreateDockRequest__Output, _DriveYourCity_DockResponse>;
  
  GetAllDocks: grpc.handleServerStreamingCall<_DriveYourCity_GetAllDocks__Output, _DriveYourCity_DockResponse>;
  
  GetDockById: grpc.handleUnaryCall<_DriveYourCity_GetDockByIdRequest__Output, _DriveYourCity_DockResponse>;
  
}

export interface IDockServiceDefinition extends grpc.ServiceDefinition {
  CreateDock: MethodDefinition<_DriveYourCity_CreateDockRequest, _DriveYourCity_DockResponse, _DriveYourCity_CreateDockRequest__Output, _DriveYourCity_DockResponse__Output>
  GetAllDocks: MethodDefinition<_DriveYourCity_GetAllDocks, _DriveYourCity_DockResponse, _DriveYourCity_GetAllDocks__Output, _DriveYourCity_DockResponse__Output>
  GetDockById: MethodDefinition<_DriveYourCity_GetDockByIdRequest, _DriveYourCity_DockResponse, _DriveYourCity_GetDockByIdRequest__Output, _DriveYourCity_DockResponse__Output>
}
