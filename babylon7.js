// https://astexplorer.net/
// use babylon7 see AST tree
// 这个文件没有用, 只是用来对比和参考

// 1. 源码 
require('./a');

// 2. AST JSON
{
  "type": "File",
  "start": 0,
  "end": 14,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 14
    }
  },
  "program": {
    "type": "Program",
    "start": 0,
    "end": 14,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 14
      }
    },
    "sourceType": "module",
    "interpreter": null,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 14,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "expression": {
          "type": "CallExpression",
          "start": 0,
          "end": 14,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 14
            }
          },
          "callee": {
            "type": "Identifier",
            "start": 0,
            "end": 7,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 7
              },
              "identifierName": "require"
            },
            "name": "require"
          },
          "arguments": [
            {
              "type": "StringLiteral",
              "start": 8,
              "end": 13,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 13
                }
              },
              "extra": {
                "rawValue": "./a",
                "raw": "'./a'"
              },
              "value": "./a"
            }
          ]
        }
      }
    ],
    "directives": []
  },
  "comments": []
}
