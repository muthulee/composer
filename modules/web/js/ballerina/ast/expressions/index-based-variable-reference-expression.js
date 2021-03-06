/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import _ from 'lodash';
import Expression from './expression';
import FragmentUtils from './../../utils/fragment-utils';
import ASTFactory from '../ast-factory.js';

/**
 * Class to represent index based variable reference expressions
 * @extends Expression
 */
class IndexBasedVariableReferenceExpression extends Expression {
    /**
     * construct the expression
     */
    constructor() {
        super('IndexBasedVariableReferenceExpression');
        this.whiteSpace.defaultDescriptor.regions = {
            0: '',
            1: '',
            2: '',
            3: '',
        };
    }

    /**
     * Init from json node
     * There are two children expressions expected
     * eg. a["b"] or a[b]  or a.aa["b"]
     *      1st child will be a var ref expr representing 'a' or 'a.aa' (including package if any)
     *      2nd child will be either a basic literal (of type string) or a simple var ref expr
     * @param {Object} jsonNode to initialize from
     */
    initFromJson(jsonNode) {
        this.getChildren().length = 0;
        if (!_.isNil(jsonNode.children) && !_.isEmpty(jsonNode.children)) {
            jsonNode.children.forEach((childNode) => {
                const child = ASTFactory.createFromJson(childNode);
                this.addChild(child, undefined, true, true);
                child.initFromJson(childNode);
            });
        }
    }

    /**
     * @see IndexBasedVariableReferenceExpression#initFromJson
     * @returns {Expression} begining var ref expression
     */
    getVarRefExpr() {
        return this.children[0];
    }

    /**
     * @see initFromJson docs
     * @returns {Expression} index expression
     */
    getIndexExpr() {
        return this.children[1];
    }

    /**
     * Generate expression string
     * @returns {string} expression string
     */
    getExpressionString() {
        const varRefString = this.getVarRefExpr().getExpressionString();
        const indexExprString = this.getIndexExpr().getExpressionString();
        return `${varRefString}[${this.getWSRegion(2)}${indexExprString}]${this.getWSRegion(3)}`;
    }

    /**
    * get the string from expression editor
    * call fragment parser and get parse tree of the node
    * validate and create children from scratch
    **/
    setExpressionFromString(exprString, callback) {
        if (!_.isNil(exprString)) {
            const fragment = FragmentUtils.createExpressionFragment(exprString);
            const parsedJson = FragmentUtils.parseFragment(fragment);
            if ((!_.has(parsedJson, 'error')
                   || !_.has(parsedJson, 'syntax_errors'))
                   && _.isEqual(parsedJson.type, 'index_based_variable_reference_expression')) {
                this.initFromJson(parsedJson);
                if (_.isFunction(callback)) {
                    callback({ isValid: true });
                }
            } else if (_.isFunction(callback)) {
                callback({ isValid: false, response: parsedJson });
            }
        }
    }
}

export default IndexBasedVariableReferenceExpression;

