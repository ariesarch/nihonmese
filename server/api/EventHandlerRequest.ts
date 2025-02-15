// EventHandlerRequest.ts
export interface EventHandlerRequest {
    // Define the properties you expect in the request
    body?: any; // Adjust this type as needed
    query?: Record<string, any>;
    params?: Record<string, any>;
}