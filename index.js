const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const todoService = protoDescriptor.TodoService;

const client = new todoService(
  "localhost:50501",
  grpc.ChannelCredentials.createInsecure()
);

client.ListTodos({}, (err, todos) => {
  if (!err) {
    console.log(todos);
    client.CreateTodo(
      {
        id: "4",
        title: "Todo 4",
        content: "Content of Todo 4",
      },
      (err, todo) => {
        if (!err) {
          console.log("Created A New Todo:-", todo);
          client.ListTodos({}, (err, todos) => {
            if (!err) {
              console.log(todos);
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      }
    );
  } else {
    console.log(err);
  }
});
