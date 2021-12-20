/*! For license information please see index.js.LICENSE.txt */
(() => {
    var e = {
        265: function (e, t, n) {
            "use strict";
            var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
                void 0 === r && (r = n), Object.defineProperty(e, r, {
                    enumerable: !0, get: function () {
                        return t[n]
                    }
                })
            } : function (e, t, n, r) {
                void 0 === r && (r = n), e[r] = t[n]
            }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) {
                Object.defineProperty(e, "default", {enumerable: !0, value: t})
            } : function (e, t) {
                e.default = t
            }), o = this && this.__importStar || function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && r(t, e, n);
                return i(t, e), t
            };
            Object.defineProperty(t, "__esModule", {value: !0}), t.issue = t.issueCommand = void 0;
            const a = o(n(87)), s = n(570);

            function c(e, t, n) {
                const r = new u(e, t, n);
                process.stdout.write(r.toString() + a.EOL)
            }

            t.issueCommand = c, t.issue = function (e, t = "") {
                c(e, {}, t)
            };

            class u {
                constructor(e, t, n) {
                    e || (e = "missing.command"), this.command = e, this.properties = t, this.message = n
                }

                toString() {
                    let e = "::" + this.command;
                    if (this.properties && Object.keys(this.properties).length > 0) {
                        e += " ";
                        let n = !0;
                        for (const r in this.properties) if (this.properties.hasOwnProperty(r)) {
                            const i = this.properties[r];
                            i && (n ? n = !1 : e += ",", e += `${r}=${t = i, s.toCommandValue(t).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C")}`)
                        }
                    }
                    var t;
                    return e += `::${function (e) {
                        return s.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A")
                    }(this.message)}`, e
                }
            }
        }, 225: function (e, t, n) {
            "use strict";
            var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
                void 0 === r && (r = n), Object.defineProperty(e, r, {
                    enumerable: !0, get: function () {
                        return t[n]
                    }
                })
            } : function (e, t, n, r) {
                void 0 === r && (r = n), e[r] = t[n]
            }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) {
                Object.defineProperty(e, "default", {enumerable: !0, value: t})
            } : function (e, t) {
                e.default = t
            }), o = this && this.__importStar || function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && r(t, e, n);
                return i(t, e), t
            }, a = this && this.__awaiter || function (e, t, n, r) {
                return new (n || (n = Promise))((function (i, o) {
                    function a(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((r = r.apply(e, t || [])).next())
                }))
            };
            Object.defineProperty(t, "__esModule", {value: !0}), t.getState = t.saveState = t.group = t.endGroup = t.startGroup = t.info = t.warning = t.error = t.debug = t.isDebug = t.setFailed = t.setCommandEcho = t.setOutput = t.getBooleanInput = t.getMultilineInput = t.getInput = t.addPath = t.setSecret = t.exportVariable = t.ExitCode = void 0;
            const s = n(265), c = n(108), u = n(570), l = o(n(87)), d = o(n(622));
            var p;

            function f(e, t) {
                const n = process.env[`INPUT_${e.replace(/ /g, "_").toUpperCase()}`] || "";
                if (t && t.required && !n) throw new Error(`Input required and not supplied: ${e}`);
                return t && !1 === t.trimWhitespace ? n : n.trim()
            }

            function m(e) {
                s.issue("error", e instanceof Error ? e.toString() : e)
            }

            function v(e) {
                s.issue("group", e)
            }

            function g() {
                s.issue("endgroup")
            }

            !function (e) {
                e[e.Success = 0] = "Success", e[e.Failure = 1] = "Failure"
            }(p = t.ExitCode || (t.ExitCode = {})), t.exportVariable = function (e, t) {
                const n = u.toCommandValue(t);
                if (process.env[e] = n, process.env.GITHUB_ENV) {
                    const t = "_GitHubActionsFileCommandDelimeter_", r = `${e}<<${t}${l.EOL}${n}${l.EOL}${t}`;
                    c.issueCommand("ENV", r)
                } else s.issueCommand("set-env", {name: e}, n)
            }, t.setSecret = function (e) {
                s.issueCommand("add-mask", {}, e)
            }, t.addPath = function (e) {
                process.env.GITHUB_PATH ? c.issueCommand("PATH", e) : s.issueCommand("add-path", {}, e), process.env.PATH = `${e}${d.delimiter}${process.env.PATH}`
            }, t.getInput = f, t.getMultilineInput = function (e, t) {
                return f(e, t).split("\n").filter((e => "" !== e))
            }, t.getBooleanInput = function (e, t) {
                const n = f(e, t);
                if (["true", "True", "TRUE"].includes(n)) return !0;
                if (["false", "False", "FALSE"].includes(n)) return !1;
                throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}\nSupport boolean input list: \`true | True | TRUE | false | False | FALSE\``)
            }, t.setOutput = function (e, t) {
                process.stdout.write(l.EOL), s.issueCommand("set-output", {name: e}, t)
            }, t.setCommandEcho = function (e) {
                s.issue("echo", e ? "on" : "off")
            }, t.setFailed = function (e) {
                process.exitCode = p.Failure, m(e)
            }, t.isDebug = function () {
                return "1" === process.env.RUNNER_DEBUG
            }, t.debug = function (e) {
                s.issueCommand("debug", {}, e)
            }, t.error = m, t.warning = function (e) {
                s.issue("warning", e instanceof Error ? e.toString() : e)
            }, t.info = function (e) {
                process.stdout.write(e + l.EOL)
            }, t.startGroup = v, t.endGroup = g, t.group = function (e, t) {
                return a(this, void 0, void 0, (function* () {
                    let n;
                    v(e);
                    try {
                        n = yield t()
                    } finally {
                        g()
                    }
                    return n
                }))
            }, t.saveState = function (e, t) {
                s.issueCommand("save-state", {name: e}, t)
            }, t.getState = function (e) {
                return process.env[`STATE_${e}`] || ""
            }
        }, 108: function (e, t, n) {
            "use strict";
            var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
                void 0 === r && (r = n), Object.defineProperty(e, r, {
                    enumerable: !0, get: function () {
                        return t[n]
                    }
                })
            } : function (e, t, n, r) {
                void 0 === r && (r = n), e[r] = t[n]
            }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) {
                Object.defineProperty(e, "default", {enumerable: !0, value: t})
            } : function (e, t) {
                e.default = t
            }), o = this && this.__importStar || function (e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && r(t, e, n);
                return i(t, e), t
            };
            Object.defineProperty(t, "__esModule", {value: !0}), t.issueCommand = void 0;
            const a = o(n(747)), s = o(n(87)), c = n(570);
            t.issueCommand = function (e, t) {
                const n = process.env[`GITHUB_${e}`];
                if (!n) throw new Error(`Unable to find environment variable for file command ${e}`);
                if (!a.existsSync(n)) throw new Error(`Missing file at path: ${n}`);
                a.appendFileSync(n, `${c.toCommandValue(t)}${s.EOL}`, {encoding: "utf8"})
            }
        }, 570: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {value: !0}), t.toCommandValue = void 0, t.toCommandValue = function (e) {
                return null == e ? "" : "string" == typeof e || e instanceof String ? e : JSON.stringify(e)
            }
        }, 656: (e, t, n) => {
            "use strict";
            n.r(t), n.d(t, {
                Attribute: () => Eo,
                AuthorizationData: () => qo,
                BatchCheckLayerAvailabilityCommand: () => Qu,
                BatchCheckLayerAvailabilityRequest: () => mi,
                BatchCheckLayerAvailabilityResponse: () => wi,
                BatchDeleteImageCommand: () => el,
                BatchDeleteImageRequest: () => Ii,
                BatchDeleteImageResponse: () => Ri,
                BatchGetImageCommand: () => tl,
                BatchGetImageRequest: () => Ni,
                BatchGetImageResponse: () => Li,
                CompleteLayerUploadCommand: () => nl,
                CompleteLayerUploadRequest: () => Ai,
                CompleteLayerUploadResponse: () => ki,
                CreateRepositoryCommand: () => rl,
                CreateRepositoryRequest: () => Bi,
                CreateRepositoryResponse: () => Gi,
                DeleteLifecyclePolicyCommand: () => il,
                DeleteLifecyclePolicyRequest: () => Yi,
                DeleteLifecyclePolicyResponse: () => Zi,
                DeleteRegistryPolicyCommand: () => ol,
                DeleteRegistryPolicyRequest: () => eo,
                DeleteRegistryPolicyResponse: () => to,
                DeleteRepositoryCommand: () => al,
                DeleteRepositoryPolicyCommand: () => sl,
                DeleteRepositoryPolicyRequest: () => ao,
                DeleteRepositoryPolicyResponse: () => so,
                DeleteRepositoryRequest: () => ro,
                DeleteRepositoryResponse: () => io,
                DescribeImageScanFindingsCommand: () => cl,
                DescribeImageScanFindingsRequest: () => bo,
                DescribeImageScanFindingsResponse: () => Io,
                DescribeImagesCommand: () => ul,
                DescribeImagesFilter: () => lo,
                DescribeImagesRequest: () => po,
                DescribeImagesResponse: () => ho,
                DescribeRegistryCommand: () => ll,
                DescribeRegistryRequest: () => To,
                DescribeRegistryResponse: () => Lo,
                DescribeRepositoriesCommand: () => dl,
                DescribeRepositoriesRequest: () => ko,
                DescribeRepositoriesResponse: () => zo,
                ECR: () => zl,
                ECRClient: () => hs,
                EmptyUploadException: () => zi,
                EncryptionConfiguration: () => ji,
                EncryptionType: () => $i,
                FindingSeverity: () => fo,
                GetAuthorizationTokenCommand: () => pl,
                GetAuthorizationTokenRequest: () => Do,
                GetAuthorizationTokenResponse: () => Mo,
                GetDownloadUrlForLayerCommand: () => fl,
                GetDownloadUrlForLayerRequest: () => Oo,
                GetDownloadUrlForLayerResponse: () => Fo,
                GetLifecyclePolicyCommand: () => ml,
                GetLifecyclePolicyPreviewCommand: () => vl,
                GetLifecyclePolicyPreviewRequest: () => Bo,
                GetLifecyclePolicyPreviewResponse: () => Xo,
                GetLifecyclePolicyRequest: () => _o,
                GetLifecyclePolicyResponse: () => Uo,
                GetRegistryPolicyCommand: () => gl,
                GetRegistryPolicyRequest: () => Zo,
                GetRegistryPolicyResponse: () => Qo,
                GetRepositoryPolicyCommand: () => yl,
                GetRepositoryPolicyRequest: () => ea,
                GetRepositoryPolicyResponse: () => ta,
                Image: () => Pi,
                ImageActionType: () => Ho,
                ImageAlreadyExistsException: () => ua,
                ImageDetail: () => yo,
                ImageDigestDoesNotMatchException: () => la,
                ImageFailure: () => Ti,
                ImageFailureCode: () => Ci,
                ImageIdentifier: () => xi,
                ImageNotFoundException: () => wo,
                ImageScanFinding: () => So,
                ImageScanFindings: () => xo,
                ImageScanFindingsSummary: () => mo,
                ImageScanStatus: () => go,
                ImageScanningConfiguration: () => _i,
                ImageTagAlreadyExistsException: () => da,
                ImageTagMutability: () => Ui,
                InitiateLayerUploadCommand: () => hl,
                InitiateLayerUploadRequest: () => na,
                InitiateLayerUploadResponse: () => ra,
                InvalidLayerException: () => Di,
                InvalidLayerPartException: () => Oa,
                InvalidParameterException: () => bi,
                InvalidTagParameterException: () => Ki,
                KmsException: () => qi,
                Layer: () => hi,
                LayerAlreadyExistsException: () => Mi,
                LayerAvailability: () => yi,
                LayerFailure: () => gi,
                LayerFailureCode: () => vi,
                LayerInaccessibleException: () => $o,
                LayerPartTooSmallException: () => Oi,
                LayersNotFoundException: () => jo,
                LifecyclePolicyNotFoundException: () => Qi,
                LifecyclePolicyPreviewFilter: () => Vo,
                LifecyclePolicyPreviewInProgressException: () => La,
                LifecyclePolicyPreviewNotFoundException: () => Yo,
                LifecyclePolicyPreviewResult: () => Ko,
                LifecyclePolicyPreviewStatus: () => Wo,
                LifecyclePolicyPreviewSummary: () => Jo,
                LifecyclePolicyRuleAction: () => Go,
                LimitExceededException: () => Wi,
                ListImagesCommand: () => wl,
                ListImagesFilter: () => ia,
                ListImagesRequest: () => oa,
                ListImagesResponse: () => aa,
                ListTagsForResourceCommand: () => bl,
                ListTagsForResourceRequest: () => sa,
                ListTagsForResourceResponse: () => ca,
                PutImageCommand: () => El,
                PutImageRequest: () => pa,
                PutImageResponse: () => fa,
                PutImageScanningConfigurationCommand: () => Sl,
                PutImageScanningConfigurationRequest: () => va,
                PutImageScanningConfigurationResponse: () => ga,
                PutImageTagMutabilityCommand: () => xl,
                PutImageTagMutabilityRequest: () => ya,
                PutImageTagMutabilityResponse: () => ha,
                PutLifecyclePolicyCommand: () => Il,
                PutLifecyclePolicyRequest: () => wa,
                PutLifecyclePolicyResponse: () => ba,
                PutRegistryPolicyCommand: () => Cl,
                PutRegistryPolicyRequest: () => Ea,
                PutRegistryPolicyResponse: () => Sa,
                PutReplicationConfigurationCommand: () => Tl,
                PutReplicationConfigurationRequest: () => xa,
                PutReplicationConfigurationResponse: () => Ia,
                ReferencedImagesNotFoundException: () => ma,
                RegistryPolicyNotFoundException: () => no,
                ReplicationConfiguration: () => Po,
                ReplicationDestination: () => Ro,
                ReplicationRule: () => No,
                Repository: () => Hi,
                RepositoryAlreadyExistsException: () => Ji,
                RepositoryNotEmptyException: () => oo,
                RepositoryNotFoundException: () => Ei,
                RepositoryPolicyNotFoundException: () => co,
                ScanNotFoundException: () => Co,
                ScanStatus: () => vo,
                ServerException: () => Si,
                SetRepositoryPolicyCommand: () => Rl,
                SetRepositoryPolicyRequest: () => Ca,
                SetRepositoryPolicyResponse: () => Ta,
                StartImageScanCommand: () => Nl,
                StartImageScanRequest: () => Ra,
                StartImageScanResponse: () => Na,
                StartLifecyclePolicyPreviewCommand: () => Pl,
                StartLifecyclePolicyPreviewRequest: () => Aa,
                StartLifecyclePolicyPreviewResponse: () => ka,
                Tag: () => Vi,
                TagResourceCommand: () => Ll,
                TagResourceRequest: () => za,
                TagResourceResponse: () => Da,
                TagStatus: () => uo,
                TooManyTagsException: () => Xi,
                UnsupportedImageTypeException: () => Pa,
                UntagResourceCommand: () => Al,
                UntagResourceRequest: () => qa,
                UntagResourceResponse: () => Ma,
                UploadLayerPartCommand: () => kl,
                UploadLayerPartRequest: () => Fa,
                UploadLayerPartResponse: () => $a,
                UploadNotFoundException: () => Fi,
                ValidationException: () => Ao,
                paginateDescribeImageScanFindings: () => $l,
                paginateDescribeImages: () => Ml,
                paginateDescribeRepositories: () => Yl,
                paginateGetLifecyclePolicyPreview: () => ed,
                paginateListImages: () => ad,
                waitForImageScanComplete: () => Kl,
                waitForLifecyclePolicyPreviewComplete: () => nd,
                waitUntilImageScanComplete: () => Wl,
                waitUntilLifecyclePolicyPreviewComplete: () => rd
            });
            var r = function (e, t) {
                return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                })(e, t)
            };

            function i(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }

                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }

            var o, a, s, c, u, l, d, p, f, m, v, g, y, h, w, b, E, S, x, I, C, T, R, N, P, L, A, k, z, D = function () {
                return (D = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }).apply(this, arguments)
            };

            function q(e, t) {
                var n = {};
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }

            function M(e, t, n, r) {
                return new (n || (n = Promise))((function (i, o) {
                    function a(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                            e(t)
                        }))).then(a, s)
                    }

                    c((r = r.apply(e, t || [])).next())
                }))
            }

            function O(e, t) {
                var n, r, i, o, a = {
                    label: 0, sent: function () {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    }, trys: [], ops: []
                };
                return o = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                    return this
                }), o;

                function s(o) {
                    return function (s) {
                        return function (o) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                                switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return a.label++, {value: o[1], done: !1};
                                    case 5:
                                        a.label++, r = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = a.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            a.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && a.label < i[1]) {
                                            a.label = i[1], i = o;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(o);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e], r = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & o[0]) throw o[1];
                            return {value: o[0] ? o[1] : void 0, done: !0}
                        }([o, s])
                    }
                }
            }

            function F(e) {
                var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
                if (n) return n.call(e);
                if (e && "number" == typeof e.length) return {
                    next: function () {
                        return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }

            function $(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r, i, o = n.call(e), a = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done;) a.push(r.value)
                } catch (e) {
                    i = {error: e}
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i) throw i.error
                    }
                }
                return a
            }

            function j(e, t, n) {
                if (n || 2 === arguments.length) for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
                return e.concat(r || t)
            }

            function _(e) {
                return this instanceof _ ? (this.v = e, this) : new _(e)
            }

            function U(e, t, n) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = n.apply(e, t || []), o = [];
                return r = {}, a("next"), a("throw"), a("return"), r[Symbol.asyncIterator] = function () {
                    return this
                }, r;

                function a(e) {
                    i[e] && (r[e] = function (t) {
                        return new Promise((function (n, r) {
                            o.push([e, t, n, r]) > 1 || s(e, t)
                        }))
                    })
                }

                function s(e, t) {
                    try {
                        (n = i[e](t)).value instanceof _ ? Promise.resolve(n.value.v).then(c, u) : l(o[0][2], n)
                    } catch (e) {
                        l(o[0][3], e)
                    }
                    var n
                }

                function c(e) {
                    s("next", e)
                }

                function u(e) {
                    s("throw", e)
                }

                function l(e, t) {
                    e(t), o.shift(), o.length && s(o[0][0], o[0][1])
                }
            }

            Object.create, Object.create, function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(o || (o = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(a || (a = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(s || (s = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(c || (c = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(u || (u = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(l || (l = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(d || (d = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(p || (p = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(f || (f = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(m || (m = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(v || (v = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(g || (g = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(y || (y = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(h || (h = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(w || (w = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(b || (b = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(E || (E = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(S || (S = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(x || (x = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(I || (I = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(C || (C = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(T || (T = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(R || (R = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(N || (N = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(P || (P = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(L || (L = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(A || (A = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(k || (k = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(z || (z = {}));
            var V = function () {
                    function e(e) {
                        this.statusCode = e.statusCode, this.headers = e.headers || {}, this.body = e.body
                    }

                    return e.isInstance = function (e) {
                        if (!e) return !1;
                        var t = e;
                        return "number" == typeof t.statusCode && "object" == typeof t.headers
                    }, e
                }(), B = function () {
                    function e(e) {
                        this.method = e.method || "GET", this.hostname = e.hostname || "localhost", this.port = e.port, this.query = e.query || {}, this.headers = e.headers || {}, this.body = e.body, this.protocol = e.protocol ? ":" !== e.protocol.substr(-1) ? e.protocol + ":" : e.protocol : "https:", this.path = e.path ? "/" !== e.path.charAt(0) ? "/" + e.path : e.path : "/"
                    }

                    return e.isInstance = function (e) {
                        if (!e) return !1;
                        var t = e;
                        return "method" in t && "protocol" in t && "hostname" in t && "path" in t && "object" == typeof t.query && "object" == typeof t.headers
                    }, e.prototype.clone = function () {
                        var t, n = new e(D(D({}, this), {headers: D({}, this.headers)}));
                        return n.query && (n.query = (t = n.query, Object.keys(t).reduce((function (e, n) {
                            var r, i = t[n];
                            return D(D({}, e), ((r = {})[n] = Array.isArray(i) ? j([], $(i)) : i, r))
                        }), {}))), n
                    }, e
                }(), H = function () {
                    var e = [], t = [], n = new Set, r = function (n) {
                        return e.forEach((function (e) {
                            n.add(e.middleware, D({}, e))
                        })), t.forEach((function (e) {
                            n.addRelativeTo(e.middleware, D({}, e))
                        })), n
                    }, i = function (e) {
                        var t = [];
                        return e.before.forEach((function (e) {
                            0 === e.before.length && 0 === e.after.length ? t.push(e) : t.push.apply(t, j([], $(i(e))))
                        })), t.push(e), e.after.reverse().forEach((function (e) {
                            0 === e.before.length && 0 === e.after.length ? t.push(e) : t.push.apply(t, j([], $(i(e))))
                        })), t
                    }, o = {
                        add: function (t, r) {
                            void 0 === r && (r = {});
                            var i = r.name, o = r.override,
                                a = D({step: "initialize", priority: "normal", middleware: t}, r);
                            if (i) {
                                if (n.has(i)) {
                                    if (!o) throw new Error("Duplicate middleware name '" + i + "'");
                                    var s = e.findIndex((function (e) {
                                        return e.name === i
                                    })), c = e[s];
                                    if (c.step !== a.step || c.priority !== a.priority) throw new Error('"' + i + '" middleware with ' + c.priority + " priority in " + c.step + " step cannot be overridden by same-name middleware with " + a.priority + " priority in " + a.step + " step.");
                                    e.splice(s, 1)
                                }
                                n.add(i)
                            }
                            e.push(a)
                        }, addRelativeTo: function (e, r) {
                            var i = r.name, o = r.override, a = D({middleware: e}, r);
                            if (i) {
                                if (n.has(i)) {
                                    if (!o) throw new Error("Duplicate middleware name '" + i + "'");
                                    var s = t.findIndex((function (e) {
                                        return e.name === i
                                    })), c = t[s];
                                    if (c.toMiddleware !== a.toMiddleware || c.relation !== a.relation) throw new Error('"' + i + '" middleware ' + c.relation + ' "' + c.toMiddleware + '" middleware cannot be overridden by same-name middleware ' + a.relation + ' "' + a.toMiddleware + '" middleware.');
                                    t.splice(s, 1)
                                }
                                n.add(i)
                            }
                            t.push(a)
                        }, clone: function () {
                            return r(H())
                        }, use: function (e) {
                            e.applyToStack(o)
                        }, remove: function (r) {
                            return "string" == typeof r ? function (r) {
                                var i = !1, o = function (e) {
                                    return !e.name || e.name !== r || (i = !0, n.delete(r), !1)
                                };
                                return e = e.filter(o), t = t.filter(o), i
                            }(r) : function (r) {
                                var i = !1, o = function (e) {
                                    return e.middleware !== r || (i = !0, e.name && n.delete(e.name), !1)
                                };
                                return e = e.filter(o), t = t.filter(o), i
                            }(r)
                        }, removeByTag: function (r) {
                            var i = !1, o = function (e) {
                                var t = e.tags, o = e.name;
                                return !t || !t.includes(r) || (o && n.delete(o), i = !0, !1)
                            };
                            return e = e.filter(o), t = t.filter(o), i
                        }, concat: function (e) {
                            var t = r(H());
                            return t.use(e), t
                        }, applyToStack: r, resolve: function (n, r) {
                            var o, a;
                            try {
                                for (var s = F(function () {
                                    var n, r = [], o = [], a = {};
                                    return e.forEach((function (e) {
                                        var t = D(D({}, e), {before: [], after: []});
                                        t.name && (a[t.name] = t), r.push(t)
                                    })), t.forEach((function (e) {
                                        var t = D(D({}, e), {before: [], after: []});
                                        t.name && (a[t.name] = t), o.push(t)
                                    })), o.forEach((function (e) {
                                        if (e.toMiddleware) {
                                            var t = a[e.toMiddleware];
                                            if (void 0 === t) throw new Error(e.toMiddleware + " is not found when adding " + (e.name || "anonymous") + " middleware " + e.relation + " " + e.toMiddleware);
                                            "after" === e.relation && t.after.push(e), "before" === e.relation && t.before.push(e)
                                        }
                                    })), (n = r, n.sort((function (e, t) {
                                        return G[t.step] - G[e.step] || K[t.priority || "normal"] - K[e.priority || "normal"]
                                    }))).map(i).reduce((function (e, t) {
                                        return e.push.apply(e, j([], $(t))), e
                                    }), []).map((function (e) {
                                        return e.middleware
                                    }))
                                }().reverse()), c = s.next(); !c.done; c = s.next()) n = (0, c.value)(n, r)
                            } catch (e) {
                                o = {error: e}
                            } finally {
                                try {
                                    c && !c.done && (a = s.return) && a.call(s)
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            return n
                        }
                    };
                    return o
                }, G = {initialize: 5, serialize: 4, build: 3, finalizeRequest: 2, deserialize: 1},
                K = {high: 3, normal: 2, low: 1}, W = function () {
                    function e(e) {
                        this.middlewareStack = H(), this.config = e
                    }

                    return e.prototype.send = function (e, t, n) {
                        var r = "function" != typeof t ? t : void 0, i = "function" == typeof t ? t : n,
                            o = e.resolveMiddleware(this.middlewareStack, this.config, r);
                        if (!i) return o(e).then((function (e) {
                            return e.output
                        }));
                        o(e).then((function (e) {
                            return i(null, e.output)
                        }), (function (e) {
                            return i(e)
                        })).catch((function () {
                        }))
                    }, e.prototype.destroy = function () {
                        this.config.requestHandler.destroy && this.config.requestHandler.destroy()
                    }, e
                }(), J = function () {
                    this.middlewareStack = H()
                };

            function X(e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, (function (e) {
                    return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                }))
            }

            var Y = function (e) {
                for (var t in e) e.hasOwnProperty(t) && void 0 !== e[t]["#text"] ? e[t] = e[t]["#text"] : "object" == typeof e[t] && null !== e[t] && (e[t] = Y(e[t]));
                return e
            }, Z = function () {
                var e = Object.getPrototypeOf(this).constructor,
                    t = Function.bind.apply(String, j([null], $(arguments))), n = new t;
                return Object.setPrototypeOf(n, e.prototype), n
            };
            Z.prototype = Object.create(String.prototype, {
                constructor: {
                    value: Z,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), Object.setPrototypeOf(Z, String), function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }

                i(t, e), t.prototype.deserializeJSON = function () {
                    return JSON.parse(e.prototype.toString.call(this))
                }, t.prototype.toJSON = function () {
                    return e.prototype.toString.call(this)
                }, t.fromObject = function (e) {
                    return e instanceof t ? e : new t(e instanceof String || "string" == typeof e ? e : JSON.stringify(e))
                }
            }(Z);
            var Q = "***SensitiveInformation***", ee = n(863), te = n(965), ne = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r, i, o, a, s, c, u, l, d, p;
                        return O(this, (function (f) {
                            switch (f.label) {
                                case 0:
                                    return r = [D({}, e)], p = {}, [4, Re(e.body, t)];
                                case 1:
                                    switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Pe(e, n.body)) {
                                        case"ExpiredTokenException":
                                        case"com.amazonaws.sts#ExpiredTokenException":
                                            return [3, 2];
                                        case"MalformedPolicyDocumentException":
                                        case"com.amazonaws.sts#MalformedPolicyDocumentException":
                                            return [3, 4];
                                        case"PackedPolicyTooLargeException":
                                        case"com.amazonaws.sts#PackedPolicyTooLargeException":
                                            return [3, 6];
                                        case"RegionDisabledException":
                                        case"com.amazonaws.sts#RegionDisabledException":
                                            return [3, 8]
                                    }
                                    return [3, 10];
                                case 2:
                                    return a = [{}], [4, ie(n, t)];
                                case 3:
                                    return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 11];
                                case 4:
                                    return s = [{}], [4, ce(n, t)];
                                case 5:
                                    return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 11];
                                case 6:
                                    return c = [{}], [4, ue(n, t)];
                                case 7:
                                    return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 11];
                                case 8:
                                    return u = [{}], [4, le(n, t)];
                                case 9:
                                    return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 11];
                                case 10:
                                    l = n.body, o = l.Error.code || l.Error.Code || o, i = D(D({}, l.Error), {
                                        name: "" + o,
                                        message: l.Error.message || l.Error.Message || o,
                                        $fault: "client",
                                        $metadata: Ce(e)
                                    }), f.label = 11;
                                case 11:
                                    return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                            }
                        }))
                    }))
                }, re = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r, i, o, a, s, c, u, l, d, p, f, m, v;
                        return O(this, (function (g) {
                            switch (g.label) {
                                case 0:
                                    return r = [D({}, e)], v = {}, [4, Re(e.body, t)];
                                case 1:
                                    switch (n = D.apply(void 0, r.concat([(v.body = g.sent(), v)])), o = "UnknownError", o = Pe(e, n.body)) {
                                        case"ExpiredTokenException":
                                        case"com.amazonaws.sts#ExpiredTokenException":
                                            return [3, 2];
                                        case"IDPCommunicationErrorException":
                                        case"com.amazonaws.sts#IDPCommunicationErrorException":
                                            return [3, 4];
                                        case"IDPRejectedClaimException":
                                        case"com.amazonaws.sts#IDPRejectedClaimException":
                                            return [3, 6];
                                        case"InvalidIdentityTokenException":
                                        case"com.amazonaws.sts#InvalidIdentityTokenException":
                                            return [3, 8];
                                        case"MalformedPolicyDocumentException":
                                        case"com.amazonaws.sts#MalformedPolicyDocumentException":
                                            return [3, 10];
                                        case"PackedPolicyTooLargeException":
                                        case"com.amazonaws.sts#PackedPolicyTooLargeException":
                                            return [3, 12];
                                        case"RegionDisabledException":
                                        case"com.amazonaws.sts#RegionDisabledException":
                                            return [3, 14]
                                    }
                                    return [3, 16];
                                case 2:
                                    return a = [{}], [4, ie(n, t)];
                                case 3:
                                    return i = D.apply(void 0, [D.apply(void 0, a.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 4:
                                    return s = [{}], [4, oe(n, t)];
                                case 5:
                                    return i = D.apply(void 0, [D.apply(void 0, s.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 6:
                                    return c = [{}], [4, ae(n, t)];
                                case 7:
                                    return i = D.apply(void 0, [D.apply(void 0, c.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 8:
                                    return u = [{}], [4, se(n, t)];
                                case 9:
                                    return i = D.apply(void 0, [D.apply(void 0, u.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 10:
                                    return l = [{}], [4, ce(n, t)];
                                case 11:
                                    return i = D.apply(void 0, [D.apply(void 0, l.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 12:
                                    return d = [{}], [4, ue(n, t)];
                                case 13:
                                    return i = D.apply(void 0, [D.apply(void 0, d.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 14:
                                    return p = [{}], [4, le(n, t)];
                                case 15:
                                    return i = D.apply(void 0, [D.apply(void 0, p.concat([g.sent()])), {
                                        name: o,
                                        $metadata: Ce(e)
                                    }]), [3, 17];
                                case 16:
                                    f = n.body, o = f.Error.code || f.Error.Code || o, i = D(D({}, f.Error), {
                                        name: "" + o,
                                        message: f.Error.message || f.Error.Message || o,
                                        $fault: "client",
                                        $metadata: Ce(e)
                                    }), g.label = 17;
                                case 17:
                                    return m = i.message || i.Message || o, i.message = m, delete i.Message, [2, Promise.reject(Object.assign(new Error(m), i))]
                            }
                        }))
                    }))
                }, ie = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = he(n.Error, t), [2, D({
                                name: "ExpiredTokenException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, oe = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = we(n.Error, t), [2, D({
                                name: "IDPCommunicationErrorException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, ae = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = be(n.Error, t), [2, D({
                                name: "IDPRejectedClaimException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, se = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = Ee(n.Error, t), [2, D({
                                name: "InvalidIdentityTokenException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, ce = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = Se(n.Error, t), [2, D({
                                name: "MalformedPolicyDocumentException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, ue = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = xe(n.Error, t), [2, D({
                                name: "PackedPolicyTooLargeException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, le = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r;
                        return O(this, (function (i) {
                            return n = e.body, r = Ie(n.Error, t), [2, D({
                                name: "RegionDisabledException",
                                $fault: "client",
                                $metadata: Ce(e)
                            }, r)]
                        }))
                    }))
                }, de = function (e, t) {
                    var n, r, i = {}, o = 1;
                    try {
                        for (var a = F(e), s = a.next(); !s.done; s = a.next()) {
                            var c = s.value;
                            if (null !== c) {
                                var u = pe(c, t);
                                Object.entries(u).forEach((function (e) {
                                    var t = $(e, 2), n = t[0], r = t[1];
                                    i["member." + o + "." + n] = r
                                })), o++
                            }
                        }
                    } catch (e) {
                        n = {error: e}
                    } finally {
                        try {
                            s && !s.done && (r = a.return) && r.call(a)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                    return i
                }, pe = function (e, t) {
                    var n = {};
                    return void 0 !== e.arn && null !== e.arn && (n.arn = e.arn), n
                }, fe = function (e, t) {
                    var n = {};
                    return void 0 !== e.Key && null !== e.Key && (n.Key = e.Key), void 0 !== e.Value && null !== e.Value && (n.Value = e.Value), n
                }, me = function (e, t) {
                    var n, r, i = {}, o = 1;
                    try {
                        for (var a = F(e), s = a.next(); !s.done; s = a.next()) {
                            var c = s.value;
                            null !== c && (i["member." + o] = c, o++)
                        }
                    } catch (e) {
                        n = {error: e}
                    } finally {
                        try {
                            s && !s.done && (r = a.return) && r.call(a)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                    return i
                }, ve = function (e, t) {
                    var n, r, i = {}, o = 1;
                    try {
                        for (var a = F(e), s = a.next(); !s.done; s = a.next()) {
                            var c = s.value;
                            if (null !== c) {
                                var u = fe(c);
                                Object.entries(u).forEach((function (e) {
                                    var t = $(e, 2), n = t[0], r = t[1];
                                    i["member." + o + "." + n] = r
                                })), o++
                            }
                        }
                    } catch (e) {
                        n = {error: e}
                    } finally {
                        try {
                            s && !s.done && (r = a.return) && r.call(a)
                        } finally {
                            if (n) throw n.error
                        }
                    }
                    return i
                }, ge = function (e, t) {
                    var n = {AssumedRoleId: void 0, Arn: void 0};
                    return void 0 !== e.AssumedRoleId && (n.AssumedRoleId = e.AssumedRoleId), void 0 !== e.Arn && (n.Arn = e.Arn), n
                }, ye = function (e, t) {
                    var n = {AccessKeyId: void 0, SecretAccessKey: void 0, SessionToken: void 0, Expiration: void 0};
                    return void 0 !== e.AccessKeyId && (n.AccessKeyId = e.AccessKeyId), void 0 !== e.SecretAccessKey && (n.SecretAccessKey = e.SecretAccessKey), void 0 !== e.SessionToken && (n.SessionToken = e.SessionToken), void 0 !== e.Expiration && (n.Expiration = new Date(e.Expiration)), n
                }, he = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, we = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, be = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, Ee = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, Se = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, xe = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, Ie = function (e, t) {
                    var n = {message: void 0};
                    return void 0 !== e.message && (n.message = e.message), n
                }, Ce = function (e) {
                    var t;
                    return {
                        httpStatusCode: e.statusCode,
                        requestId: null !== (t = e.headers["x-amzn-requestid"]) && void 0 !== t ? t : e.headers["x-amzn-request-id"],
                        extendedRequestId: e.headers["x-amz-id-2"],
                        cfId: e.headers["x-amz-cf-id"]
                    }
                }, Te = function (e, t, n, r, i) {
                    return M(void 0, void 0, void 0, (function () {
                        var o, a, s, c, u, l;
                        return O(this, (function (d) {
                            switch (d.label) {
                                case 0:
                                    return [4, e.endpoint()];
                                case 1:
                                    return o = d.sent(), a = o.hostname, s = o.protocol, c = void 0 === s ? "https" : s, u = o.port, l = {
                                        protocol: c,
                                        hostname: a,
                                        port: u,
                                        method: "POST",
                                        path: n,
                                        headers: t
                                    }, void 0 !== r && (l.hostname = r), void 0 !== i && (l.body = i), [2, new B(l)]
                            }
                        }))
                    }))
                }, Re = function (e, t) {
                    return function (e, t) {
                        return function (e, t) {
                            return void 0 === e && (e = new Uint8Array), e instanceof Uint8Array ? Promise.resolve(e) : t.streamCollector(e) || Promise.resolve(new Uint8Array)
                        }(e, t).then((function (e) {
                            return t.utf8Encoder(e)
                        }))
                    }(e, t).then((function (e) {
                        if (e.length) {
                            var t = (0, te.parse)(e, {
                                attributeNamePrefix: "",
                                ignoreAttributes: !1,
                                parseNodeValue: !1,
                                trimValues: !1,
                                tagValueProcessor: function (e, t) {
                                    return "" === e.trim() ? "" : (0, ee.p1)(e)
                                }
                            }), n = Object.keys(t)[0], r = t[n];
                            return r["#text"] && (r[n] = r["#text"], delete r["#text"]), Y(r)
                        }
                        return {}
                    }))
                }, Ne = function (e) {
                    return Object.entries(e).map((function (e) {
                        var t = $(e, 2), n = t[0], r = t[1];
                        return X(n) + "=" + X(r)
                    })).join("&")
                }, Pe = function (e, t) {
                    return void 0 !== t.Error.Code ? t.Error.Code : 404 == e.statusCode ? "NotFound" : ""
                }, Le = {name: "deserializerMiddleware", step: "deserialize", tags: ["DESERIALIZER"], override: !0},
                Ae = {name: "serializerMiddleware", step: "serialize", tags: ["SERIALIZER"], override: !0};

            function ke(e, t, n) {
                return {
                    applyToStack: function (r) {
                        r.add(function (e, t) {
                            return function (n, r) {
                                return function (r) {
                                    return M(void 0, void 0, void 0, (function () {
                                        var i, o;
                                        return O(this, (function (a) {
                                            switch (a.label) {
                                                case 0:
                                                    return [4, n(r)];
                                                case 1:
                                                    return i = a.sent().response, [4, t(i, e)];
                                                case 2:
                                                    return o = a.sent(), [2, {response: i, output: o}]
                                            }
                                        }))
                                    }))
                                }
                            }
                        }(e, n), Le), r.add(function (e, t) {
                            return function (n, r) {
                                return function (r) {
                                    return M(void 0, void 0, void 0, (function () {
                                        var i;
                                        return O(this, (function (o) {
                                            switch (o.label) {
                                                case 0:
                                                    return [4, t(r.input, e)];
                                                case 1:
                                                    return i = o.sent(), [2, n(D(D({}, r), {request: i}))]
                                            }
                                        }))
                                    }))
                                }
                            }
                        }(e, t), Ae)
                    }
                }
            }

            var ze = function (e) {
                function t(t, n) {
                    void 0 === n && (n = !0);
                    var r = e.call(this, t) || this;
                    return r.tryNextLink = n, r
                }

                return i(t, e), t.from = function (e, t) {
                    return void 0 === t && (t = !0), Object.defineProperty(e, "tryNextLink", {
                        value: t,
                        configurable: !1,
                        enumerable: !1,
                        writable: !1
                    }), e
                }, t
            }(Error), De = function (e) {
                function t(t, n) {
                    void 0 === n && (n = !0);
                    var r = e.call(this, t) || this;
                    return r.tryNextLink = n, r.name = "CredentialsProviderError", r
                }

                return i(t, e), t.from = function (e, t) {
                    return void 0 === t && (t = !0), Object.defineProperty(e, "tryNextLink", {
                        value: t,
                        configurable: !1,
                        enumerable: !1,
                        writable: !1
                    }), e
                }, t
            }(Error);

            function qe() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return function () {
                    var t, n, r = Promise.reject(new ze("No providers in chain")), i = function (e) {
                        r = r.catch((function (t) {
                            if (null == t ? void 0 : t.tryNextLink) return e();
                            throw t
                        }))
                    };
                    try {
                        for (var o = F(e), a = o.next(); !a.done; a = o.next()) i(a.value)
                    } catch (e) {
                        t = {error: e}
                    } finally {
                        try {
                            a && !a.done && (n = o.return) && n.call(o)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                    return r
                }
            }

            for (var Me = function (e, t, n) {
                var r, i;
                if (void 0 === t) return function () {
                    return i || (r = e(), i = !0), r
                };
                var o = !1;
                return function () {
                    return M(void 0, void 0, void 0, (function () {
                        var a;
                        return O(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    return i || (r = e(), i = !0), o ? [2, r] : [4, r];
                                case 1:
                                    return a = s.sent(), n && !n(a) ? (o = !0, [2, a]) : t(a) ? [2, r = e()] : [2, a]
                            }
                        }))
                    }))
                }
            }, Oe = {}, Fe = {}, $e = 0; $e < 256; $e++) {
                var je = $e.toString(16).toLowerCase();
                1 === je.length && (je = "0" + je), Oe[$e] = je, Fe[je] = $e
            }

            function _e(e) {
                for (var t = "", n = 0; n < e.byteLength; n++) t += Oe[e[n]];
                return t
            }

            var Ue = "X-Amz-Signature", Ve = "X-Amz-Security-Token", Be = "authorization",
                He = "X-Amz-Date".toLowerCase(), Ge = [Be, He, "date"], Ke = Ue.toLowerCase(),
                We = "x-amz-content-sha256", Je = Ve.toLowerCase(), Xe = {
                    authorization: !0,
                    "cache-control": !0,
                    connection: !0,
                    expect: !0,
                    from: !0,
                    "keep-alive": !0,
                    "max-forwards": !0,
                    pragma: !0,
                    referer: !0,
                    te: !0,
                    trailer: !0,
                    "transfer-encoding": !0,
                    upgrade: !0,
                    "user-agent": !0,
                    "x-amzn-trace-id": !0
                }, Ye = /^proxy-/, Ze = /^sec-/, Qe = "AWS4-HMAC-SHA256-PAYLOAD", et = "aws4_request", tt = {}, nt = [];

            function rt(e, t, n) {
                return e + "/" + t + "/" + n + "/" + et
            }

            function it(e, t, n) {
                var r = new e(t);
                return r.update(n), r.digest()
            }

            function ot(e, t, n) {
                var r, i, o = e.headers, a = {};
                try {
                    for (var s = F(Object.keys(o).sort()), c = s.next(); !c.done; c = s.next()) {
                        var u = c.value, l = u.toLowerCase();
                        (l in Xe || (null == t ? void 0 : t.has(l)) || Ye.test(l) || Ze.test(l)) && (!n || n && !n.has(l)) || (a[l] = o[u].trim().replace(/\s+/g, " "))
                    }
                } catch (e) {
                    r = {error: e}
                } finally {
                    try {
                        c && !c.done && (i = s.return) && i.call(s)
                    } finally {
                        if (r) throw r.error
                    }
                }
                return a
            }

            var at = function (e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, st)
            }, st = function (e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            }, ct = function (e) {
                return "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || "[object ArrayBuffer]" === Object.prototype.toString.call(e)
            };

            function ut(e, t) {
                var n = e.headers, r = e.body;
                return M(this, void 0, void 0, (function () {
                    var e, i, o, a, s, c, u;
                    return O(this, (function (l) {
                        switch (l.label) {
                            case 0:
                                try {
                                    for (e = F(Object.keys(n)), i = e.next(); !i.done; i = e.next()) if ((o = i.value).toLowerCase() === We) return [2, n[o]]
                                } catch (e) {
                                    c = {error: e}
                                } finally {
                                    try {
                                        i && !i.done && (u = e.return) && u.call(e)
                                    } finally {
                                        if (c) throw c.error
                                    }
                                }
                                return null != r ? [3, 1] : [2, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"];
                            case 1:
                                return "string" == typeof r || ArrayBuffer.isView(r) || ct(r) ? ((a = new t).update(r), s = _e, [4, a.digest()]) : [3, 3];
                            case 2:
                                return [2, s.apply(void 0, [l.sent()])];
                            case 3:
                                return [2, "UNSIGNED-PAYLOAD"]
                        }
                    }))
                }))
            }

            function lt(e) {
                var t = e.headers, n = e.query, r = q(e, ["headers", "query"]);
                return D(D({}, r), {headers: D({}, t), query: n ? dt(n) : void 0})
            }

            function dt(e) {
                return Object.keys(e).reduce((function (t, n) {
                    var r, i = e[n];
                    return D(D({}, t), ((r = {})[n] = Array.isArray(i) ? j([], $(i)) : i, r))
                }), {})
            }

            function pt(e) {
                var t, n;
                e = "function" == typeof e.clone ? e.clone() : lt(e);
                try {
                    for (var r = F(Object.keys(e.headers)), i = r.next(); !i.done; i = r.next()) {
                        var o = i.value;
                        Ge.indexOf(o.toLowerCase()) > -1 && delete e.headers[o]
                    }
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        i && !i.done && (n = r.return) && n.call(r)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return e
            }

            var ft = function () {
                function e(e) {
                    var t = e.applyChecksum, n = e.credentials, r = e.region, i = e.service, o = e.sha256,
                        a = e.uriEscapePath, s = void 0 === a || a;
                    this.service = i, this.sha256 = o, this.uriEscapePath = s, this.applyChecksum = "boolean" != typeof t || t, this.regionProvider = gt(r), this.credentialProvider = yt(n)
                }

                return e.prototype.presign = function (e, t) {
                    return void 0 === t && (t = {}), M(this, void 0, void 0, (function () {
                        var n, r, i, o, a, s, c, u, l, d, p, f, m, v, g, y, h, w, b, E, S, x, I, C;
                        return O(this, (function (T) {
                            switch (T.label) {
                                case 0:
                                    return n = t.signingDate, r = void 0 === n ? new Date : n, i = t.expiresIn, o = void 0 === i ? 3600 : i, a = t.unsignableHeaders, s = t.unhoistableHeaders, c = t.signableHeaders, u = t.signingRegion, l = t.signingService, [4, this.credentialProvider()];
                                case 1:
                                    return d = T.sent(), null == u ? [3, 2] : (f = u, [3, 4]);
                                case 2:
                                    return [4, this.regionProvider()];
                                case 3:
                                    f = T.sent(), T.label = 4;
                                case 4:
                                    return p = f, m = mt(r), v = m.longDate, g = m.shortDate, o > 604800 ? [2, Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future")] : (y = rt(g, p, null != l ? l : this.service), h = function (e, t) {
                                        var n, r, i;
                                        void 0 === t && (t = {});
                                        var o = "function" == typeof e.clone ? e.clone() : lt(e), a = o.headers,
                                            s = o.query, c = void 0 === s ? {} : s;
                                        try {
                                            for (var u = F(Object.keys(a)), l = u.next(); !l.done; l = u.next()) {
                                                var d = l.value, p = d.toLowerCase();
                                                "x-amz-" !== p.substr(0, 6) || (null === (i = t.unhoistableHeaders) || void 0 === i ? void 0 : i.has(p)) || (c[d] = a[d], delete a[d])
                                            }
                                        } catch (e) {
                                            n = {error: e}
                                        } finally {
                                            try {
                                                l && !l.done && (r = u.return) && r.call(u)
                                            } finally {
                                                if (n) throw n.error
                                            }
                                        }
                                        return D(D({}, e), {headers: a, query: c})
                                    }(pt(e), {unhoistableHeaders: s}), d.sessionToken && (h.query[Ve] = d.sessionToken), h.query["X-Amz-Algorithm"] = "AWS4-HMAC-SHA256", h.query["X-Amz-Credential"] = d.accessKeyId + "/" + y, h.query["X-Amz-Date"] = v, h.query["X-Amz-Expires"] = o.toString(10), w = ot(h, a, c), h.query["X-Amz-SignedHeaders"] = vt(w), b = h.query, E = Ue, S = this.getSignature, x = [v, y, this.getSigningKey(d, p, g, l)], I = this.createCanonicalRequest, C = [h, w], [4, ut(e, this.sha256)]);
                                case 5:
                                    return [4, S.apply(this, x.concat([I.apply(this, C.concat([T.sent()]))]))];
                                case 6:
                                    return b[E] = T.sent(), [2, h]
                            }
                        }))
                    }))
                }, e.prototype.sign = function (e, t) {
                    return M(this, void 0, void 0, (function () {
                        return O(this, (function (n) {
                            return "string" == typeof e ? [2, this.signString(e, t)] : e.headers && e.payload ? [2, this.signEvent(e, t)] : [2, this.signRequest(e, t)]
                        }))
                    }))
                }, e.prototype.signEvent = function (e, t) {
                    var n = e.headers, r = e.payload, i = t.signingDate, o = void 0 === i ? new Date : i,
                        a = t.priorSignature, s = t.signingRegion, c = t.signingService;
                    return M(this, void 0, void 0, (function () {
                        var e, t, i, u, l, d, p, f, m, v, g;
                        return O(this, (function (y) {
                            switch (y.label) {
                                case 0:
                                    return null == s ? [3, 1] : (t = s, [3, 3]);
                                case 1:
                                    return [4, this.regionProvider()];
                                case 2:
                                    t = y.sent(), y.label = 3;
                                case 3:
                                    return e = t, i = mt(o), u = i.shortDate, l = i.longDate, d = rt(u, e, null != c ? c : this.service), [4, ut({
                                        headers: {},
                                        body: r
                                    }, this.sha256)];
                                case 4:
                                    return p = y.sent(), (f = new this.sha256).update(n), v = _e, [4, f.digest()];
                                case 5:
                                    return m = v.apply(void 0, [y.sent()]), g = [Qe, l, d, a, m, p].join("\n"), [2, this.signString(g, {
                                        signingDate: o,
                                        signingRegion: e,
                                        signingService: c
                                    })]
                            }
                        }))
                    }))
                }, e.prototype.signString = function (e, t) {
                    var n = void 0 === t ? {} : t, r = n.signingDate, i = void 0 === r ? new Date : r,
                        o = n.signingRegion, a = n.signingService;
                    return M(this, void 0, void 0, (function () {
                        var t, n, r, s, c, u, l, d;
                        return O(this, (function (p) {
                            switch (p.label) {
                                case 0:
                                    return [4, this.credentialProvider()];
                                case 1:
                                    return t = p.sent(), null == o ? [3, 2] : (r = o, [3, 4]);
                                case 2:
                                    return [4, this.regionProvider()];
                                case 3:
                                    r = p.sent(), p.label = 4;
                                case 4:
                                    return n = r, s = mt(i).shortDate, l = (u = this.sha256).bind, [4, this.getSigningKey(t, n, s, a)];
                                case 5:
                                    return (c = new (l.apply(u, [void 0, p.sent()]))).update(e), d = _e, [4, c.digest()];
                                case 6:
                                    return [2, d.apply(void 0, [p.sent()])]
                            }
                        }))
                    }))
                }, e.prototype.signRequest = function (e, t) {
                    var n = void 0 === t ? {} : t, r = n.signingDate, i = void 0 === r ? new Date : r,
                        o = n.signableHeaders, a = n.unsignableHeaders, s = n.signingRegion, c = n.signingService;
                    return M(this, void 0, void 0, (function () {
                        var t, n, r, u, l, d, p, f, m, v, g;
                        return O(this, (function (y) {
                            switch (y.label) {
                                case 0:
                                    return [4, this.credentialProvider()];
                                case 1:
                                    return t = y.sent(), null == s ? [3, 2] : (r = s, [3, 4]);
                                case 2:
                                    return [4, this.regionProvider()];
                                case 3:
                                    r = y.sent(), y.label = 4;
                                case 4:
                                    return n = r, u = pt(e), l = mt(i), d = l.longDate, p = l.shortDate, f = rt(p, n, null != c ? c : this.service), u.headers[He] = d, t.sessionToken && (u.headers[Je] = t.sessionToken), [4, ut(u, this.sha256)];
                                case 5:
                                    return m = y.sent(), !function (e, t) {
                                        var n, r;
                                        e = e.toLowerCase();
                                        try {
                                            for (var i = F(Object.keys(t)), o = i.next(); !o.done; o = i.next()) if (e === o.value.toLowerCase()) return !0
                                        } catch (e) {
                                            n = {error: e}
                                        } finally {
                                            try {
                                                o && !o.done && (r = i.return) && r.call(i)
                                            } finally {
                                                if (n) throw n.error
                                            }
                                        }
                                        return !1
                                    }(We, u.headers) && this.applyChecksum && (u.headers[We] = m), v = ot(u, a, o), [4, this.getSignature(d, f, this.getSigningKey(t, n, p, c), this.createCanonicalRequest(u, v, m))];
                                case 6:
                                    return g = y.sent(), u.headers[Be] = "AWS4-HMAC-SHA256 Credential=" + t.accessKeyId + "/" + f + ", SignedHeaders=" + vt(v) + ", Signature=" + g, [2, u]
                            }
                        }))
                    }))
                }, e.prototype.createCanonicalRequest = function (e, t, n) {
                    var r = Object.keys(t).sort();
                    return e.method + "\n" + this.getCanonicalPath(e) + "\n" + function (e) {
                        var t, n, r = e.query, i = void 0 === r ? {} : r, o = [], a = {}, s = function (e) {
                            if (e.toLowerCase() === Ke) return "continue";
                            o.push(e);
                            var t = i[e];
                            "string" == typeof t ? a[e] = at(e) + "=" + at(t) : Array.isArray(t) && (a[e] = t.slice(0).sort().reduce((function (t, n) {
                                return t.concat([at(e) + "=" + at(n)])
                            }), []).join("&"))
                        };
                        try {
                            for (var c = F(Object.keys(i).sort()), u = c.next(); !u.done; u = c.next()) s(u.value)
                        } catch (e) {
                            t = {error: e}
                        } finally {
                            try {
                                u && !u.done && (n = c.return) && n.call(c)
                            } finally {
                                if (t) throw t.error
                            }
                        }
                        return o.map((function (e) {
                            return a[e]
                        })).filter((function (e) {
                            return e
                        })).join("&")
                    }(e) + "\n" + r.map((function (e) {
                        return e + ":" + t[e]
                    })).join("\n") + "\n\n" + r.join(";") + "\n" + n
                }, e.prototype.createStringToSign = function (e, t, n) {
                    return M(this, void 0, void 0, (function () {
                        var r, i;
                        return O(this, (function (o) {
                            switch (o.label) {
                                case 0:
                                    return (r = new this.sha256).update(n), [4, r.digest()];
                                case 1:
                                    return i = o.sent(), [2, "AWS4-HMAC-SHA256\n" + e + "\n" + t + "\n" + _e(i)]
                            }
                        }))
                    }))
                }, e.prototype.getCanonicalPath = function (e) {
                    var t = e.path;
                    return this.uriEscapePath ? "/" + encodeURIComponent(t.replace(/^\//, "")).replace(/%2F/g, "/") : t
                }, e.prototype.getSignature = function (e, t, n, r) {
                    return M(this, void 0, void 0, (function () {
                        var i, o, a, s, c;
                        return O(this, (function (u) {
                            switch (u.label) {
                                case 0:
                                    return [4, this.createStringToSign(e, t, r)];
                                case 1:
                                    return i = u.sent(), s = (a = this.sha256).bind, [4, n];
                                case 2:
                                    return (o = new (s.apply(a, [void 0, u.sent()]))).update(i), c = _e, [4, o.digest()];
                                case 3:
                                    return [2, c.apply(void 0, [u.sent()])]
                            }
                        }))
                    }))
                }, e.prototype.getSigningKey = function (e, t, n, r) {
                    return function (e, t, n, r, i) {
                        return M(void 0, void 0, void 0, (function () {
                            var o, a, s, c, u, l, d, p, f;
                            return O(this, (function (m) {
                                switch (m.label) {
                                    case 0:
                                        return [4, it(e, t.secretAccessKey, t.accessKeyId)];
                                    case 1:
                                        if (o = m.sent(), (a = n + ":" + r + ":" + i + ":" + _e(o) + ":" + t.sessionToken) in tt) return [2, tt[a]];
                                        for (nt.push(a); nt.length > 50;) delete tt[nt.shift()];
                                        s = "AWS4" + t.secretAccessKey, m.label = 2;
                                    case 2:
                                        m.trys.push([2, 7, 8, 9]), c = F([n, r, i, et]), u = c.next(), m.label = 3;
                                    case 3:
                                        return u.done ? [3, 6] : (l = u.value, [4, it(e, s, l)]);
                                    case 4:
                                        s = m.sent(), m.label = 5;
                                    case 5:
                                        return u = c.next(), [3, 3];
                                    case 6:
                                        return [3, 9];
                                    case 7:
                                        return d = m.sent(), p = {error: d}, [3, 9];
                                    case 8:
                                        try {
                                            u && !u.done && (f = c.return) && f.call(c)
                                        } finally {
                                            if (p) throw p.error
                                        }
                                        return [7];
                                    case 9:
                                        return [2, tt[a] = s]
                                }
                            }))
                        }))
                    }(this.sha256, e, n, t, r || this.service)
                }, e
            }(), mt = function (e) {
                var t, n = (t = e, function (e) {
                    return "number" == typeof e ? new Date(1e3 * e) : "string" == typeof e ? Number(e) ? new Date(1e3 * Number(e)) : new Date(e) : e
                }(t).toISOString().replace(/\.\d{3}Z$/, "Z")).replace(/[\-:]/g, "");
                return {longDate: n, shortDate: n.substr(0, 8)}
            }, vt = function (e) {
                return Object.keys(e).sort().join(";")
            }, gt = function (e) {
                if ("string" == typeof e) {
                    var t = Promise.resolve(e);
                    return function () {
                        return t
                    }
                }
                return e
            }, yt = function (e) {
                if ("object" == typeof e) {
                    var t = Promise.resolve(e);
                    return function () {
                        return t
                    }
                }
                return e
            }, ht = function (e) {
                var t, n = e.credentials ? bt(e.credentials) : e.credentialDefaultProvider(e), r = e.signingEscapePath,
                    i = void 0 === r || r, o = e.systemClockOffset, a = void 0 === o ? e.systemClockOffset || 0 : o,
                    s = e.sha256;
                return t = e.signer ? wt(e.signer) : function () {
                    return wt(e.region)().then((function (t) {
                        return M(void 0, void 0, void 0, (function () {
                            return O(this, (function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, e.regionInfoProvider(t)];
                                    case 1:
                                        return [2, [n.sent() || {}, t]]
                                }
                            }))
                        }))
                    })).then((function (t) {
                        var r = $(t, 2), o = r[0], a = r[1], c = o.signingRegion, u = o.signingService;
                        return e.signingRegion = e.signingRegion || c || a, e.signingName = e.signingName || u || e.serviceId, new ft({
                            credentials: n,
                            region: e.signingRegion,
                            service: e.signingName,
                            sha256: s,
                            uriEscapePath: i
                        })
                    }))
                }, D(D({}, e), {systemClockOffset: a, signingEscapePath: i, credentials: n, signer: t})
            }, wt = function (e) {
                if ("object" == typeof e) {
                    var t = Promise.resolve(e);
                    return function () {
                        return t
                    }
                }
                return e
            }, bt = function (e) {
                return "function" == typeof e ? Me(e, (function (e) {
                    return void 0 !== e.expiration && e.expiration.getTime() - Date.now() < 3e5
                }), (function (e) {
                    return void 0 !== e.expiration
                })) : wt(e)
            };

            function Et(e) {
                return function (t, n) {
                    return function (r) {
                        return M(this, void 0, void 0, (function () {
                            var i, o, a, s, c, u, l, d, p;
                            return O(this, (function (f) {
                                switch (f.label) {
                                    case 0:
                                        return B.isInstance(r.request) ? "function" != typeof e.signer ? [3, 2] : [4, e.signer()] : [2, t(r)];
                                    case 1:
                                        return o = f.sent(), [3, 3];
                                    case 2:
                                        o = e.signer, f.label = 3;
                                    case 3:
                                        return i = o, s = t, c = [D({}, r)], p = {}, [4, i.sign(r.request, {
                                            signingDate: new Date(Date.now() + e.systemClockOffset),
                                            signingRegion: n.signing_region,
                                            signingService: n.signing_service
                                        })];
                                    case 4:
                                        return [4, s.apply(void 0, [D.apply(void 0, c.concat([(p.request = f.sent(), p)]))])];
                                    case 5:
                                        return a = f.sent(), u = a.response.headers, (l = u && (u.date || u.Date)) && (m = d = Date.parse(l), v = e.systemClockOffset, Math.abs(function (e) {
                                            return new Date(Date.now() + e)
                                        }(v).getTime() - m) >= 3e5 && (e.systemClockOffset = d - Date.now())), [2, a]
                                }
                                var m, v
                            }))
                        }))
                    }
                }
            }

            var St = {
                name: "awsAuthMiddleware",
                tags: ["SIGNATURE", "AWSAUTH"],
                relation: "after",
                toMiddleware: "retryMiddleware",
                override: !0
            }, xt = function (e) {
                return {
                    applyToStack: function (t) {
                        t.addRelativeTo(Et(e), St)
                    }
                }
            }, It = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize)), this.middlewareStack.use(xt(t));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "STSClient",
                        commandName: "AssumeRoleCommand",
                        inputFilterSensitiveLog: c.filterSensitiveLog,
                        outputFilterSensitiveLog: l.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {"content-type": "application/x-www-form-urlencoded"}, r = Ne(D(D({}, function (e, t) {
                                    var n = {};
                                    if (void 0 !== e.RoleArn && null !== e.RoleArn && (n.RoleArn = e.RoleArn), void 0 !== e.RoleSessionName && null !== e.RoleSessionName && (n.RoleSessionName = e.RoleSessionName), void 0 !== e.PolicyArns && null !== e.PolicyArns) {
                                        var r = de(e.PolicyArns, t);
                                        Object.entries(r).forEach((function (e) {
                                            var t = $(e, 2), r = t[0], i = t[1];
                                            n["PolicyArns." + r] = i
                                        }))
                                    }
                                    return void 0 !== e.Policy && null !== e.Policy && (n.Policy = e.Policy), void 0 !== e.DurationSeconds && null !== e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds), void 0 !== e.Tags && null !== e.Tags && (r = ve(e.Tags, t), Object.entries(r).forEach((function (e) {
                                        var t = $(e, 2), r = t[0], i = t[1];
                                        n["Tags." + r] = i
                                    }))), void 0 !== e.TransitiveTagKeys && null !== e.TransitiveTagKeys && (r = me(e.TransitiveTagKeys, t), Object.entries(r).forEach((function (e) {
                                        var t = $(e, 2), r = t[0], i = t[1];
                                        n["TransitiveTagKeys." + r] = i
                                    }))), void 0 !== e.ExternalId && null !== e.ExternalId && (n.ExternalId = e.ExternalId), void 0 !== e.SerialNumber && null !== e.SerialNumber && (n.SerialNumber = e.SerialNumber), void 0 !== e.TokenCode && null !== e.TokenCode && (n.TokenCode = e.TokenCode), void 0 !== e.SourceIdentity && null !== e.SourceIdentity && (n.SourceIdentity = e.SourceIdentity), n
                                }(e, t)), {Action: "AssumeRole", Version: "2011-06-15"})), [2, Te(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, ne(e, t)] : [4, Re(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            var n = {
                                                Credentials: void 0,
                                                AssumedRoleUser: void 0,
                                                PackedPolicySize: void 0,
                                                SourceIdentity: void 0
                                            };
                                            return void 0 !== e.Credentials && (n.Credentials = ye(e.Credentials, t)), void 0 !== e.AssumedRoleUser && (n.AssumedRoleUser = ge(e.AssumedRoleUser)), void 0 !== e.PackedPolicySize && (n.PackedPolicySize = parseInt(e.PackedPolicySize)), void 0 !== e.SourceIdentity && (n.SourceIdentity = e.SourceIdentity), n
                                        }(n.AssumeRoleResult, t), i = D({$metadata: Ce(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Ct = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "STSClient",
                        commandName: "AssumeRoleWithWebIdentityCommand",
                        inputFilterSensitiveLog: w.filterSensitiveLog,
                        outputFilterSensitiveLog: b.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {"content-type": "application/x-www-form-urlencoded"}, r = Ne(D(D({}, function (e, t) {
                                    var n = {};
                                    if (void 0 !== e.RoleArn && null !== e.RoleArn && (n.RoleArn = e.RoleArn), void 0 !== e.RoleSessionName && null !== e.RoleSessionName && (n.RoleSessionName = e.RoleSessionName), void 0 !== e.WebIdentityToken && null !== e.WebIdentityToken && (n.WebIdentityToken = e.WebIdentityToken), void 0 !== e.ProviderId && null !== e.ProviderId && (n.ProviderId = e.ProviderId), void 0 !== e.PolicyArns && null !== e.PolicyArns) {
                                        var r = de(e.PolicyArns, t);
                                        Object.entries(r).forEach((function (e) {
                                            var t = $(e, 2), r = t[0], i = t[1];
                                            n["PolicyArns." + r] = i
                                        }))
                                    }
                                    return void 0 !== e.Policy && null !== e.Policy && (n.Policy = e.Policy), void 0 !== e.DurationSeconds && null !== e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds), n
                                }(e, t)), {
                                    Action: "AssumeRoleWithWebIdentity",
                                    Version: "2011-06-15"
                                })), [2, Te(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, re(e, t)] : [4, Re(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            var n = {
                                                Credentials: void 0,
                                                SubjectFromWebIdentityToken: void 0,
                                                AssumedRoleUser: void 0,
                                                PackedPolicySize: void 0,
                                                Provider: void 0,
                                                Audience: void 0,
                                                SourceIdentity: void 0
                                            };
                                            return void 0 !== e.Credentials && (n.Credentials = ye(e.Credentials, t)), void 0 !== e.SubjectFromWebIdentityToken && (n.SubjectFromWebIdentityToken = e.SubjectFromWebIdentityToken), void 0 !== e.AssumedRoleUser && (n.AssumedRoleUser = ge(e.AssumedRoleUser)), void 0 !== e.PackedPolicySize && (n.PackedPolicySize = parseInt(e.PackedPolicySize)), void 0 !== e.Provider && (n.Provider = e.Provider), void 0 !== e.Audience && (n.Audience = e.Audience), void 0 !== e.SourceIdentity && (n.SourceIdentity = e.SourceIdentity), n
                                        }(n.AssumeRoleWithWebIdentityResult, t), i = D({$metadata: Ce(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Tt = "us-east-1", Rt = function (e) {
                return "function" != typeof e ? void 0 === e ? Tt : e : function () {
                    return M(void 0, void 0, void 0, (function () {
                        return O(this, (function (t) {
                            switch (t.label) {
                                case 0:
                                    return t.trys.push([0, 2, , 3]), [4, e()];
                                case 1:
                                    return [2, t.sent()];
                                case 2:
                                    return t.sent(), [2, Tt];
                                case 3:
                                    return [2]
                            }
                        }))
                    }))
                }
            }, Nt = function (e, t) {
                var n, r;
                return function (i, o) {
                    return M(void 0, void 0, void 0, (function () {
                        var a, s, c, u;
                        return O(this, (function (l) {
                            switch (l.label) {
                                case 0:
                                    return r = i, n || (a = e.logger, s = e.region, c = e.requestHandler, n = new t(D({
                                        logger: a,
                                        credentialDefaultProvider: function () {
                                            return function () {
                                                return M(void 0, void 0, void 0, (function () {
                                                    return O(this, (function (e) {
                                                        return [2, r]
                                                    }))
                                                }))
                                            }
                                        },
                                        region: Rt(s || e.region)
                                    }, c ? {requestHandler: c} : {}))), [4, n.send(new It(o))];
                                case 1:
                                    if (!(u = l.sent().Credentials) || !u.AccessKeyId || !u.SecretAccessKey) throw new Error("Invalid response from STS.assumeRole call with role " + o.RoleArn);
                                    return [2, {
                                        accessKeyId: u.AccessKeyId,
                                        secretAccessKey: u.SecretAccessKey,
                                        sessionToken: u.SessionToken,
                                        expiration: u.Expiration
                                    }]
                            }
                        }))
                    }))
                }
            }, Pt = function (e, t) {
                var n;
                return function (r) {
                    return M(void 0, void 0, void 0, (function () {
                        var i, o, a, s;
                        return O(this, (function (c) {
                            switch (c.label) {
                                case 0:
                                    return n || (i = e.logger, o = e.region, a = e.requestHandler, n = new t(D({
                                        logger: i,
                                        region: Rt(o || e.region)
                                    }, a ? {requestHandler: a} : {}))), [4, n.send(new Ct(r))];
                                case 1:
                                    if (!(s = c.sent().Credentials) || !s.AccessKeyId || !s.SecretAccessKey) throw new Error("Invalid response from STS.assumeRoleWithWebIdentity call with role " + r.RoleArn);
                                    return [2, {
                                        accessKeyId: s.AccessKeyId,
                                        secretAccessKey: s.SecretAccessKey,
                                        sessionToken: s.SessionToken,
                                        expiration: s.Expiration
                                    }]
                            }
                        }))
                    }))
                }
            }, Lt = function (e) {
                var t;
                return D(D({}, e), {
                    tls: null === (t = e.tls) || void 0 === t || t,
                    endpoint: e.endpoint ? At(e) : function () {
                        return kt(e)
                    },
                    isCustomEndpoint: !!e.endpoint
                })
            }, At = function (e) {
                var t = e.endpoint, n = e.urlParser;
                if ("string" == typeof t) {
                    var r = Promise.resolve(n(t));
                    return function () {
                        return r
                    }
                }
                if ("object" == typeof t) {
                    var i = Promise.resolve(t);
                    return function () {
                        return i
                    }
                }
                return t
            }, kt = function (e) {
                return M(void 0, void 0, void 0, (function () {
                    var t, n, r, i, o;
                    return O(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                return t = e.tls, n = void 0 === t || t, [4, e.region()];
                            case 1:
                                if (r = a.sent(), !new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/).test(r)) throw new Error("Invalid region in client config");
                                return [4, e.regionInfoProvider(r)];
                            case 2:
                                if (!(i = (null !== (o = a.sent()) && void 0 !== o ? o : {}).hostname)) throw new Error("Cannot resolve hostname from client config");
                                return [2, e.urlParser((n ? "https:" : "http:") + "//" + i)]
                        }
                    }))
                }))
            }, zt = {
                environmentVariableSelector: function (e) {
                    return e.AWS_REGION
                }, configFileSelector: function (e) {
                    return e.region
                }, default: function () {
                    throw new Error("Region is missing")
                }
            }, Dt = {preferredFile: "credentials"}, qt = function (e) {
                if (!e.region) throw new Error("Region is missing");
                return D(D({}, e), {region: Mt(e.region)})
            }, Mt = function (e) {
                if ("string" == typeof e) {
                    var t = Promise.resolve(e);
                    return function () {
                        return t
                    }
                }
                return e
            };

            function Ot() {
                return function () {
                    var e = process.env.AWS_ACCESS_KEY_ID, t = process.env.AWS_SECRET_ACCESS_KEY,
                        n = process.env.AWS_CREDENTIAL_EXPIRATION;
                    return e && t ? Promise.resolve({
                        accessKeyId: e,
                        secretAccessKey: t,
                        sessionToken: process.env.AWS_SESSION_TOKEN,
                        expiration: n ? new Date(n) : void 0
                    }) : Promise.reject(new De("Unable to find environment variable credentials."))
                }
            }

            const Ft = require("url"), $t = require("buffer"), jt = require("http");

            function _t(e) {
                return new Promise((function (t, n) {
                    var r = (0, jt.request)(D({method: "GET"}, e));
                    r.on("error", (function (e) {
                        n(Object.assign(new ze("Unable to connect to instance metadata service"), e)), r.destroy()
                    })), r.on("timeout", (function () {
                        n(new ze("TimeoutError from instance metadata service")), r.destroy()
                    })), r.on("response", (function (e) {
                        var i = e.statusCode, o = void 0 === i ? 400 : i;
                        (o < 200 || 300 <= o) && (n(Object.assign(new ze("Error response received from instance metadata service"), {statusCode: o})), r.destroy());
                        var a = [];
                        e.on("data", (function (e) {
                            a.push(e)
                        })), e.on("end", (function () {
                            t($t.Buffer.concat(a)), r.destroy()
                        }))
                    })), r.end()
                }))
            }

            var Ut = function (e) {
                    return Boolean(e) && "object" == typeof e && "string" == typeof e.AccessKeyId && "string" == typeof e.SecretAccessKey && "string" == typeof e.Token && "string" == typeof e.Expiration
                }, Vt = function (e) {
                    return {
                        accessKeyId: e.AccessKeyId,
                        secretAccessKey: e.SecretAccessKey,
                        sessionToken: e.Token,
                        expiration: new Date(e.Expiration)
                    }
                }, Bt = function (e) {
                    var t = e.maxRetries, n = void 0 === t ? 0 : t, r = e.timeout;
                    return {maxRetries: n, timeout: void 0 === r ? 1e3 : r}
                }, Ht = function (e, t) {
                    for (var n = e(), r = 0; r < t; r++) n = n.catch(e);
                    return n
                }, Gt = "AWS_CONTAINER_CREDENTIALS_FULL_URI", Kt = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
                Wt = "AWS_CONTAINER_AUTHORIZATION_TOKEN", Jt = function (e) {
                    void 0 === e && (e = {});
                    var t = Bt(e), n = t.timeout, r = t.maxRetries;
                    return function () {
                        return Ht((function () {
                            return M(void 0, void 0, void 0, (function () {
                                var e, t, r, i;
                                return O(this, (function (o) {
                                    switch (o.label) {
                                        case 0:
                                            return [4, Qt()];
                                        case 1:
                                            return e = o.sent(), i = (r = JSON).parse, [4, Xt(n, e)];
                                        case 2:
                                            if (t = i.apply(r, [o.sent()]), !Ut(t)) throw new De("Invalid response received from instance metadata service.");
                                            return [2, Vt(t)]
                                    }
                                }))
                            }))
                        }), r)
                    }
                }, Xt = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        return O(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return process.env[Wt] && (t.headers = D(D({}, t.headers), {Authorization: process.env[Wt]})), [4, _t(D(D({}, t), {timeout: e}))];
                                case 1:
                                    return [2, n.sent().toString()]
                            }
                        }))
                    }))
                }, Yt = {localhost: !0, "127.0.0.1": !0}, Zt = {"http:": !0, "https:": !0}, Qt = function () {
                    return M(void 0, void 0, void 0, (function () {
                        var e;
                        return O(this, (function (t) {
                            if (process.env[Kt]) return [2, {hostname: "169.254.170.2", path: process.env[Kt]}];
                            if (process.env[Gt]) {
                                if (!(e = (0, Ft.parse)(process.env[Gt])).hostname || !(e.hostname in Yt)) throw new De(e.hostname + " is not a valid container metadata service hostname", !1);
                                if (!e.protocol || !(e.protocol in Zt)) throw new De(e.protocol + " is not a valid container metadata service protocol", !1);
                                return [2, D(D({}, e), {port: e.port ? parseInt(e.port, 10) : void 0})]
                            }
                            throw new De("The container metadata credential provider cannot be used unless the " + Kt + " or " + Gt + " environment variable is set", !1)
                        }))
                    }))
                }, en = "169.254.169.254", tn = "/latest/meta-data/iam/security-credentials/", nn = function (e) {
                    void 0 === e && (e = {});
                    var t = !1, n = Bt(e), r = n.timeout, i = n.maxRetries, o = function (e, n) {
                        return M(void 0, void 0, void 0, (function () {
                            var r;
                            return O(this, (function (i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, Ht((function () {
                                            return M(void 0, void 0, void 0, (function () {
                                                var e, r;
                                                return O(this, (function (i) {
                                                    switch (i.label) {
                                                        case 0:
                                                            return i.trys.push([0, 2, , 3]), [4, on(n)];
                                                        case 1:
                                                            return e = i.sent(), [3, 3];
                                                        case 2:
                                                            throw 401 === (r = i.sent()).statusCode && (t = !1), r;
                                                        case 3:
                                                            return [2, e]
                                                    }
                                                }))
                                            }))
                                        }), e)];
                                    case 1:
                                        return r = i.sent().trim(), [2, Ht((function () {
                                            return M(void 0, void 0, void 0, (function () {
                                                var e, i;
                                                return O(this, (function (o) {
                                                    switch (o.label) {
                                                        case 0:
                                                            return o.trys.push([0, 2, , 3]), [4, an(r, n)];
                                                        case 1:
                                                            return e = o.sent(), [3, 3];
                                                        case 2:
                                                            throw 401 === (i = o.sent()).statusCode && (t = !1), i;
                                                        case 3:
                                                            return [2, e]
                                                    }
                                                }))
                                            }))
                                        }), e)]
                                }
                            }))
                        }))
                    };
                    return function () {
                        return M(void 0, void 0, void 0, (function () {
                            var e, n;
                            return O(this, (function (a) {
                                switch (a.label) {
                                    case 0:
                                        return t ? [2, o(i, {timeout: r})] : [3, 1];
                                    case 1:
                                        e = void 0, a.label = 2;
                                    case 2:
                                        return a.trys.push([2, 4, , 5]), [4, rn({timeout: r})];
                                    case 3:
                                        return e = a.sent().toString(), [3, 5];
                                    case 4:
                                        if (400 === (null == (n = a.sent()) ? void 0 : n.statusCode)) throw Object.assign(n, {message: "EC2 Metadata token request returned error"});
                                        return ("TimeoutError" === n.message || [403, 404, 405].includes(n.statusCode)) && (t = !0), [2, o(i, {timeout: r})];
                                    case 5:
                                        return [2, o(i, {timeout: r, headers: {"x-aws-ec2-metadata-token": e}})]
                                }
                            }))
                        }))
                    }
                }, rn = function (e) {
                    return M(void 0, void 0, void 0, (function () {
                        return O(this, (function (t) {
                            return [2, _t(D(D({}, e), {
                                host: en,
                                path: "/latest/api/token",
                                method: "PUT",
                                headers: {"x-aws-ec2-metadata-token-ttl-seconds": "21600"}
                            }))]
                        }))
                    }))
                }, on = function (e) {
                    return M(void 0, void 0, void 0, (function () {
                        return O(this, (function (t) {
                            switch (t.label) {
                                case 0:
                                    return [4, _t(D(D({}, e), {host: en, path: tn}))];
                                case 1:
                                    return [2, t.sent().toString()]
                            }
                        }))
                    }))
                }, an = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r, i;
                        return O(this, (function (o) {
                            switch (o.label) {
                                case 0:
                                    return i = (r = JSON).parse, [4, _t(D(D({}, t), {host: en, path: tn + e}))];
                                case 1:
                                    if (n = i.apply(r, [o.sent().toString()]), !Ut(n)) throw new De("Invalid response received from instance metadata service.");
                                    return [2, Vt(n)]
                            }
                        }))
                    }))
                }, sn = n(747), cn = function (e) {
                    return void 0 === e && (e = {}), function () {
                        return M(void 0, void 0, void 0, (function () {
                            return O(this, (function (t) {
                                return [2, un(e)]
                            }))
                        }))
                    }
                }, un = function (e) {
                    var t, n, r,
                        i = null !== (t = null == e ? void 0 : e.webIdentityTokenFile) && void 0 !== t ? t : process.env.AWS_WEB_IDENTITY_TOKEN_FILE,
                        o = null !== (n = null == e ? void 0 : e.roleArn) && void 0 !== n ? n : process.env.AWS_ROLE_ARN,
                        a = null !== (r = null == e ? void 0 : e.roleSessionName) && void 0 !== r ? r : process.env.AWS_ROLE_SESSION_NAME;
                    if (!i || !o) throw new De("Web identity configuration not specified");
                    return function (e) {
                        return function () {
                            var t = e.roleArn, n = e.roleSessionName, r = e.webIdentityToken, i = e.providerId,
                                o = e.policyArns, a = e.policy, s = e.durationSeconds, c = e.roleAssumerWithWebIdentity;
                            if (!c) throw new De("Role Arn '" + t + "' needs to be assumed with web identity, but no role assumption callback was provided.", !1);
                            return c({
                                RoleArn: t,
                                RoleSessionName: null != n ? n : "aws-sdk-js-session-" + Date.now(),
                                WebIdentityToken: r,
                                ProviderId: i,
                                PolicyArns: o,
                                Policy: a,
                                DurationSeconds: s
                            })
                        }
                    }(D(D({}, e), {
                        webIdentityToken: (0, sn.readFileSync)(i, {encoding: "ascii"}),
                        roleArn: o,
                        roleSessionName: a
                    }))()
                }, ln = n(87), dn = n(622), pn = function () {
                    return {}
                }, fn = function (e) {
                    void 0 === e && (e = {});
                    var t = e.filepath,
                        n = void 0 === t ? process.env.AWS_SHARED_CREDENTIALS_FILE || (0, dn.join)(wn(), ".aws", "credentials") : t,
                        r = e.configFilepath,
                        i = void 0 === r ? process.env.AWS_CONFIG_FILE || (0, dn.join)(wn(), ".aws", "config") : r;
                    return Promise.all([hn(i).then(yn).then(vn).catch(pn), hn(n).then(yn).catch(pn)]).then((function (e) {
                        var t = $(e, 2);
                        return {configFile: t[0], credentialsFile: t[1]}
                    }))
                }, mn = /^profile\s(["'])?([^\1]+)\1$/, vn = function (e) {
                    var t, n, r = {};
                    try {
                        for (var i = F(Object.keys(e)), o = i.next(); !o.done; o = i.next()) {
                            var a = o.value, s = void 0;
                            if ("default" === a) r.default = e.default; else if (s = mn.exec(a)) {
                                var c = $(s, 3), u = (c[0], c[1], c[2]);
                                u && (r[u] = e[a])
                            }
                        }
                    } catch (e) {
                        t = {error: e}
                    } finally {
                        try {
                            o && !o.done && (n = i.return) && n.call(i)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                    return r
                }, gn = ["__proto__", "profile __proto__"], yn = function (e) {
                    var t, n, r, i = {};
                    try {
                        for (var o = F(e.split(/\r?\n/)), a = o.next(); !a.done; a = o.next()) {
                            var s = a.value, c = (s = s.split(/(^|\s)[;#]/)[0]).match(/^\s*\[([^\[\]]+)]\s*$/);
                            if (c) {
                                if (r = c[1], gn.includes(r)) throw new Error('Found invalid profile name "' + r + '"')
                            } else if (r) {
                                var u = s.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
                                u && (i[r] = i[r] || {}, i[r][u[1]] = u[2])
                            }
                        }
                    } catch (e) {
                        t = {error: e}
                    } finally {
                        try {
                            a && !a.done && (n = o.return) && n.call(o)
                        } finally {
                            if (t) throw t.error
                        }
                    }
                    return i
                }, hn = function (e) {
                    return new Promise((function (t, n) {
                        (0, sn.readFile)(e, "utf8", (function (e, r) {
                            e ? n(e) : t(r)
                        }))
                    }))
                }, wn = function () {
                    var e = process.env, t = e.HOME, n = e.USERPROFILE, r = e.HOMEPATH, i = e.HOMEDRIVE,
                        o = void 0 === i ? "C:" + dn.sep : i;
                    return t || n || (r ? "" + o + r : (0, ln.homedir)())
                }, bn = function (e) {
                    return Boolean(e) && "object" == typeof e && "string" == typeof e.aws_access_key_id && "string" == typeof e.aws_secret_access_key && ["undefined", "string"].indexOf(typeof e.aws_session_token) > -1
                }, En = function (e) {
                    return Boolean(e) && "object" == typeof e && "string" == typeof e.role_arn && ["undefined", "string"].indexOf(typeof e.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof e.external_id) > -1 && ["undefined", "string"].indexOf(typeof e.mfa_serial) > -1
                }, Sn = function (e) {
                    return void 0 === e && (e = {}), function () {
                        return M(void 0, void 0, void 0, (function () {
                            var t;
                            return O(this, (function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, xn(e)];
                                    case 1:
                                        return t = n.sent(), [2, Cn(In(e), t, e)]
                                }
                            }))
                        }))
                    }
                }, xn = function (e) {
                    return M(void 0, void 0, void 0, (function () {
                        var t, n;
                        return O(this, (function (r) {
                            switch (r.label) {
                                case 0:
                                    return [4, void 0 === (t = e.loadedConfig) ? fn(e) : t];
                                case 1:
                                    return n = r.sent(), [2, D(D({}, n.configFile), n.credentialsFile)]
                            }
                        }))
                    }))
                }, In = function (e) {
                    return e.profile || process.env.AWS_PROFILE || "default"
                }, Cn = function (e, t, n, r) {
                    return void 0 === r && (r = {}), M(void 0, void 0, void 0, (function () {
                        var i, o, a, s, c, u, l, d, p, f, m, v, g, y;
                        return O(this, (function (h) {
                            switch (h.label) {
                                case 0:
                                    if (i = t[e], Object.keys(r).length > 0 && bn(i)) return [2, Rn(i)];
                                    if (!(En(w = i) && "string" == typeof w.source_profile && void 0 === w.credential_source || function (e) {
                                        return En(e) && "string" == typeof e.credential_source && void 0 === e.source_profile
                                    }(i))) return [3, 4];
                                    if (o = i.external_id, a = i.mfa_serial, s = i.role_arn, c = i.role_session_name, u = void 0 === c ? "aws-sdk-js-" + Date.now() : c, l = i.source_profile, d = i.credential_source, !n.roleAssumer) throw new De("Profile " + e + " requires a role to be assumed, but no role assumption callback was provided.", !1);
                                    if (l && l in r) throw new De("Detected a cycle attempting to resolve credentials for profile " + In(n) + ". Profiles visited: " + Object.keys(r).join(", "), !1);
                                    if (p = l ? Cn(l, t, n, D(D({}, r), ((y = {})[l] = !0, y))) : Tn(d, e)(), f = {
                                        RoleArn: s,
                                        RoleSessionName: u,
                                        ExternalId: o
                                    }, !a) return [3, 2];
                                    if (!n.mfaCodeProvider) throw new De("Profile " + e + " requires multi-factor authentication, but no MFA code callback was provided.", !1);
                                    return f.SerialNumber = a, m = f, [4, n.mfaCodeProvider(a)];
                                case 1:
                                    m.TokenCode = h.sent(), h.label = 2;
                                case 2:
                                    return g = (v = n).roleAssumer, [4, p];
                                case 3:
                                    return [2, g.apply(v, [h.sent(), f])];
                                case 4:
                                    if (bn(i)) return [2, Rn(i)];
                                    if (function (e) {
                                        return Boolean(e) && "object" == typeof e && "string" == typeof e.web_identity_token_file && "string" == typeof e.role_arn && ["undefined", "string"].indexOf(typeof e.role_session_name) > -1
                                    }(i)) return [2, Nn(i, n)];
                                    throw new De("Profile " + e + " could not be found or parsed in shared credentials file.")
                            }
                            var w
                        }))
                    }))
                }, Tn = function (e, t) {
                    var n = {EcsContainer: Jt, Ec2InstanceMetadata: nn, Environment: Ot};
                    if (e in n) return n[e]();
                    throw new De("Unsupported credential source in profile " + t + ". Got " + e + ", expected EcsContainer or Ec2InstanceMetadata or Environment.")
                }, Rn = function (e) {
                    return Promise.resolve({
                        accessKeyId: e.aws_access_key_id,
                        secretAccessKey: e.aws_secret_access_key,
                        sessionToken: e.aws_session_token
                    })
                }, Nn = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        return O(this, (function (n) {
                            return [2, cn({
                                webIdentityTokenFile: e.web_identity_token_file,
                                roleArn: e.role_arn,
                                roleSessionName: e.role_session_name,
                                roleAssumerWithWebIdentity: t.roleAssumerWithWebIdentity
                            })()]
                        }))
                    }))
                };
            const Pn = require("child_process");
            var Ln = function (e) {
                return void 0 === e && (e = {}), function () {
                    return M(void 0, void 0, void 0, (function () {
                        var t;
                        return O(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return [4, xn(e)];
                                case 1:
                                    return t = n.sent(), [2, An(In(e), t)]
                            }
                        }))
                    }))
                }
            }, An = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return n = t[e], t[e] ? void 0 === (r = n.credential_process) ? [3, 2] : [4, kn(r).then((function (t) {
                                    var n;
                                    try {
                                        n = JSON.parse(t)
                                    } catch (t) {
                                        throw Error("Profile " + e + " credential_process returned invalid JSON.")
                                    }
                                    var r, i = n.Version, o = n.AccessKeyId, a = n.SecretAccessKey, s = n.SessionToken,
                                        c = n.Expiration;
                                    if (1 !== i) throw Error("Profile " + e + " credential_process did not return Version 1.");
                                    if (void 0 === o || void 0 === a) throw Error("Profile " + e + " credential_process returned invalid credentials.");
                                    if (c) {
                                        var u = new Date;
                                        if (new Date(c) < u) throw Error("Profile " + e + " credential_process returned expired credentials.");
                                        r = Math.floor(new Date(c).valueOf() / 1e3)
                                    }
                                    return {accessKeyId: o, secretAccessKey: a, sessionToken: s, expirationUnix: r}
                                })).catch((function (e) {
                                    throw new De(e.message)
                                }))] : [3, 4];
                            case 1:
                                return [2, i.sent()];
                            case 2:
                                throw new De("Profile " + e + " did not contain credential_process.");
                            case 3:
                                return [3, 5];
                            case 4:
                                throw new De("Profile " + e + " could not be found in shared credentials file.");
                            case 5:
                                return [2]
                        }
                    }))
                }))
            }, kn = function (e) {
                return new Promise((function (t, n) {
                    (0, Pn.exec)(e, (function (e, r) {
                        e ? n(e) : t(r.trim())
                    }))
                }))
            }, zn = function (e, t, n) {
                if (void 0 === t && (t = 0), void 0 === n && (n = e.byteLength - t), !ct(e)) throw new TypeError('The "input" argument must be ArrayBuffer. Received type ' + typeof e + " (" + e + ")");
                return $t.Buffer.from(e, t, n)
            }, Dn = function (e, t) {
                if ("string" != typeof e) throw new TypeError('The "input" argument must be of type string. Received type ' + typeof e + " (" + e + ")");
                return t ? $t.Buffer.from(e, t) : $t.Buffer.from(e)
            };
            const qn = require("crypto");
            var Mn = n.n(qn), On = function () {
                function e(e, t) {
                    this.hash = t ? (0, qn.createHmac)(e, Fn(t)) : (0, qn.createHash)(e)
                }

                return e.prototype.update = function (e, t) {
                    this.hash.update(Fn(e, t))
                }, e.prototype.digest = function () {
                    return Promise.resolve(this.hash.digest())
                }, e
            }();

            function Fn(e, t) {
                return $t.Buffer.isBuffer(e) ? e : "string" == typeof e ? Dn(e, t) : ArrayBuffer.isView(e) ? zn(e.buffer, e.byteOffset, e.byteLength) : zn(e)
            }

            var $n = {
                    name: "retryMiddleware",
                    tags: ["RETRY"],
                    step: "finalizeRequest",
                    priority: "high",
                    override: !0
                }, jn = function (e) {
                    return {
                        applyToStack: function (t) {
                            t.add(function (e) {
                                return function (t, n) {
                                    return function (r) {
                                        return M(void 0, void 0, void 0, (function () {
                                            var i;
                                            return O(this, (function (o) {
                                                switch (o.label) {
                                                    case 0:
                                                        return [4, e.retryStrategy()];
                                                    case 1:
                                                        return (null == (i = o.sent()) ? void 0 : i.mode) && (n.userAgent = j(j([], $(n.userAgent || [])), [["cfg/retry-mode", i.mode]])), [2, i.retry(t, r)]
                                                }
                                            }))
                                        }))
                                    }
                                }
                            }(e), $n)
                        }
                    }
                },
                _n = ["AuthFailure", "InvalidSignatureException", "RequestExpired", "RequestInTheFuture", "RequestTimeTooSkewed", "SignatureDoesNotMatch"],
                Un = ["BandwidthLimitExceeded", "EC2ThrottledException", "LimitExceededException", "PriorRequestNotComplete", "ProvisionedThroughputExceededException", "RequestLimitExceeded", "RequestThrottled", "RequestThrottledException", "SlowDown", "ThrottledException", "Throttling", "ThrottlingException", "TooManyRequestsException", "TransactionInProgressException"],
                Vn = ["AbortError", "TimeoutError", "RequestTimeout", "RequestTimeoutException"],
                Bn = [500, 502, 503, 504], Hn = function (e) {
                    var t, n;
                    return 429 === (null === (t = e.$metadata) || void 0 === t ? void 0 : t.httpStatusCode) || Un.includes(e.name) || 1 == (null === (n = e.$retryable) || void 0 === n ? void 0 : n.throttling)
                };
            const Gn = new Uint8Array(256);
            let Kn = Gn.length;

            function Wn() {
                return Kn > Gn.length - 16 && (Mn().randomFillSync(Gn), Kn = 0), Gn.slice(Kn, Kn += 16)
            }

            const Jn = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
                Xn = [];
            for (let e = 0; e < 256; ++e) Xn.push((e + 256).toString(16).substr(1));
            const Yn = function (e, t = 0) {
                const n = (Xn[e[t + 0]] + Xn[e[t + 1]] + Xn[e[t + 2]] + Xn[e[t + 3]] + "-" + Xn[e[t + 4]] + Xn[e[t + 5]] + "-" + Xn[e[t + 6]] + Xn[e[t + 7]] + "-" + Xn[e[t + 8]] + Xn[e[t + 9]] + "-" + Xn[e[t + 10]] + Xn[e[t + 11]] + Xn[e[t + 12]] + Xn[e[t + 13]] + Xn[e[t + 14]] + Xn[e[t + 15]]).toLowerCase();
                if (!function (e) {
                    return "string" == typeof e && Jn.test(e)
                }(n)) throw TypeError("Stringified UUID is invalid");
                return n
            }, Zn = function (e, t, n) {
                const r = (e = e || {}).random || (e.rng || Wn)();
                if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
                    n = n || 0;
                    for (let e = 0; e < 16; ++e) t[n + e] = r[e];
                    return t
                }
                return Yn(r)
            };
            var Qn;
            !function (e) {
                e.STANDARD = "standard", e.ADAPTIVE = "adaptive"
            }(Qn || (Qn = {}));
            var er = Qn.STANDARD, tr = function (e, t) {
                return Math.floor(Math.min(2e4, Math.random() * Math.pow(2, t) * e))
            }, nr = function (e) {
                return !!e && (function (e) {
                    return void 0 !== e.$retryable
                }(e) || function (e) {
                    return _n.includes(e.name)
                }(e) || Hn(e) || function (e) {
                    var t;
                    return Vn.includes(e.name) || Bn.includes((null === (t = e.$metadata) || void 0 === t ? void 0 : t.httpStatusCode) || 0)
                }(e))
            }, rr = function () {
                function e(e, t) {
                    var n, r, i, o, a, s, c, u, l;
                    this.maxAttemptsProvider = e, this.mode = Qn.STANDARD, this.retryDecider = null !== (n = null == t ? void 0 : t.retryDecider) && void 0 !== n ? n : nr, this.delayDecider = null !== (r = null == t ? void 0 : t.delayDecider) && void 0 !== r ? r : tr, this.retryQuota = null !== (i = null == t ? void 0 : t.retryQuota) && void 0 !== i ? i : (o = 1, a = 5, s = 10, c = 500, u = function (e) {
                        return "TimeoutError" === e.name ? s : a
                    }, l = function (e) {
                        return u(e) <= c
                    }, Object.freeze({
                        hasRetryTokens: l, retrieveRetryTokens: function (e) {
                            if (!l(e)) throw new Error("No retry token available");
                            var t = u(e);
                            return c -= t, t
                        }, releaseRetryTokens: function (e) {
                            c += null != e ? e : o, c = Math.min(c, 500)
                        }
                    }))
                }

                return e.prototype.shouldRetry = function (e, t, n) {
                    return t < n && this.retryDecider(e) && this.retryQuota.hasRetryTokens(e)
                }, e.prototype.getMaxAttempts = function () {
                    return M(this, void 0, void 0, (function () {
                        var e;
                        return O(this, (function (t) {
                            switch (t.label) {
                                case 0:
                                    return t.trys.push([0, 2, , 3]), [4, this.maxAttemptsProvider()];
                                case 1:
                                    return e = t.sent(), [3, 3];
                                case 2:
                                    return t.sent(), e = 3, [3, 3];
                                case 3:
                                    return [2, e]
                            }
                        }))
                    }))
                }, e.prototype.retry = function (e, t, n) {
                    return M(this, void 0, void 0, (function () {
                        var r, i, o, a, s, c, u, l;
                        return O(this, (function (d) {
                            switch (d.label) {
                                case 0:
                                    return i = 0, o = 0, [4, this.getMaxAttempts()];
                                case 1:
                                    a = d.sent(), s = t.request, B.isInstance(s) && (s.headers["amz-sdk-invocation-id"] = Zn()), c = function () {
                                        var c, l, d, p, f, m;
                                        return O(this, (function (v) {
                                            switch (v.label) {
                                                case 0:
                                                    return v.trys.push([0, 4, , 7]), B.isInstance(s) && (s.headers["amz-sdk-request"] = "attempt=" + (i + 1) + "; max=" + a), (null == n ? void 0 : n.beforeRequest) ? [4, n.beforeRequest()] : [3, 2];
                                                case 1:
                                                    v.sent(), v.label = 2;
                                                case 2:
                                                    return [4, e(t)];
                                                case 3:
                                                    return c = v.sent(), l = c.response, d = c.output, (null == n ? void 0 : n.afterRequest) && n.afterRequest(l), u.retryQuota.releaseRetryTokens(r), d.$metadata.attempts = i + 1, d.$metadata.totalRetryDelay = o, [2, {
                                                        value: {
                                                            response: l,
                                                            output: d
                                                        }
                                                    }];
                                                case 4:
                                                    return p = v.sent(), f = ir(p), i++, u.shouldRetry(f, i, a) ? (r = u.retryQuota.retrieveRetryTokens(f), m = u.delayDecider(Hn(f) ? 500 : 100, i), o += m, [4, new Promise((function (e) {
                                                        return setTimeout(e, m)
                                                    }))]) : [3, 6];
                                                case 5:
                                                    return v.sent(), [2, "continue"];
                                                case 6:
                                                    throw f.$metadata || (f.$metadata = {}), f.$metadata.attempts = i, f.$metadata.totalRetryDelay = o, f;
                                                case 7:
                                                    return [2]
                                            }
                                        }))
                                    }, u = this, d.label = 2;
                                case 2:
                                    return [5, c()];
                                case 3:
                                    return "object" == typeof (l = d.sent()) ? [2, l.value] : [3, 2];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }, e
            }(), ir = function (e) {
                return e instanceof Error ? e : e instanceof Object ? Object.assign(new Error, e) : "string" == typeof e ? new Error(e) : new Error("AWS SDK error wrapper for " + e)
            }, or = function () {
                function e(e) {
                    var t, n, r, i, o;
                    this.currentCapacity = 0, this.enabled = !1, this.lastMaxRate = 0, this.measuredTxRate = 0, this.requestCount = 0, this.lastTimestamp = 0, this.timeWindow = 0, this.beta = null !== (t = null == e ? void 0 : e.beta) && void 0 !== t ? t : .7, this.minCapacity = null !== (n = null == e ? void 0 : e.minCapacity) && void 0 !== n ? n : 1, this.minFillRate = null !== (r = null == e ? void 0 : e.minFillRate) && void 0 !== r ? r : .5, this.scaleConstant = null !== (i = null == e ? void 0 : e.scaleConstant) && void 0 !== i ? i : .4, this.smooth = null !== (o = null == e ? void 0 : e.smooth) && void 0 !== o ? o : .8;
                    var a = this.getCurrentTimeInSeconds();
                    this.lastThrottleTime = a, this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity
                }

                return e.prototype.getCurrentTimeInSeconds = function () {
                    return Date.now() / 1e3
                }, e.prototype.getSendToken = function () {
                    return M(this, void 0, void 0, (function () {
                        return O(this, (function (e) {
                            return [2, this.acquireTokenBucket(1)]
                        }))
                    }))
                }, e.prototype.acquireTokenBucket = function (e) {
                    return M(this, void 0, void 0, (function () {
                        var t;
                        return O(this, (function (n) {
                            switch (n.label) {
                                case 0:
                                    return this.enabled ? (this.refillTokenBucket(), e > this.currentCapacity ? (t = (e - this.currentCapacity) / this.fillRate * 1e3, [4, new Promise((function (e) {
                                        return setTimeout(e, t)
                                    }))]) : [3, 2]) : [2];
                                case 1:
                                    n.sent(), n.label = 2;
                                case 2:
                                    return this.currentCapacity = this.currentCapacity - e, [2]
                            }
                        }))
                    }))
                }, e.prototype.refillTokenBucket = function () {
                    var e = this.getCurrentTimeInSeconds();
                    if (this.lastTimestamp) {
                        var t = (e - this.lastTimestamp) * this.fillRate;
                        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + t), this.lastTimestamp = e
                    } else this.lastTimestamp = e
                }, e.prototype.updateClientSendingRate = function (e) {
                    var t;
                    if (this.updateMeasuredRate(), Hn(e)) {
                        var n = this.enabled ? Math.min(this.measuredTxRate, this.fillRate) : this.measuredTxRate;
                        this.lastMaxRate = n, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), t = this.cubicThrottle(n), this.enableTokenBucket()
                    } else this.calculateTimeWindow(), t = this.cubicSuccess(this.getCurrentTimeInSeconds());
                    var r = Math.min(t, 2 * this.measuredTxRate);
                    this.updateTokenBucketRate(r)
                }, e.prototype.calculateTimeWindow = function () {
                    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3))
                }, e.prototype.cubicThrottle = function (e) {
                    return this.getPrecise(e * this.beta)
                }, e.prototype.cubicSuccess = function (e) {
                    return this.getPrecise(this.scaleConstant * Math.pow(e - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate)
                }, e.prototype.enableTokenBucket = function () {
                    this.enabled = !0
                }, e.prototype.updateTokenBucketRate = function (e) {
                    this.refillTokenBucket(), this.fillRate = Math.max(e, this.minFillRate), this.maxCapacity = Math.max(e, this.minCapacity), this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity)
                }, e.prototype.updateMeasuredRate = function () {
                    var e = this.getCurrentTimeInSeconds(), t = Math.floor(2 * e) / 2;
                    if (this.requestCount++, t > this.lastTxRateBucket) {
                        var n = this.requestCount / (t - this.lastTxRateBucket);
                        this.measuredTxRate = this.getPrecise(n * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = t
                    }
                }, e.prototype.getPrecise = function (e) {
                    return parseFloat(e.toFixed(8))
                }, e
            }(), ar = function (e) {
                function t(t, n) {
                    var r = this, i = null != n ? n : {}, o = i.rateLimiter, a = q(i, ["rateLimiter"]);
                    return (r = e.call(this, t, a) || this).rateLimiter = null != o ? o : new or, r.mode = Qn.ADAPTIVE, r
                }

                return i(t, e), t.prototype.retry = function (t, n) {
                    return M(this, void 0, void 0, (function () {
                        var r = this;
                        return O(this, (function (i) {
                            return [2, e.prototype.retry.call(this, t, n, {
                                beforeRequest: function () {
                                    return M(r, void 0, void 0, (function () {
                                        return O(this, (function (e) {
                                            return [2, this.rateLimiter.getSendToken()]
                                        }))
                                    }))
                                }, afterRequest: function (e) {
                                    r.rateLimiter.updateClientSendingRate(e)
                                }
                            })]
                        }))
                    }))
                }, t
            }(rr), sr = {
                environmentVariableSelector: function (e) {
                    var t = e.AWS_MAX_ATTEMPTS;
                    if (t) {
                        var n = parseInt(t);
                        if (Number.isNaN(n)) throw new Error('Environment variable AWS_MAX_ATTEMPTS mast be a number, got "' + t + '"');
                        return n
                    }
                }, configFileSelector: function (e) {
                    var t = e.max_attempts;
                    if (t) {
                        var n = parseInt(t);
                        if (Number.isNaN(n)) throw new Error('Shared config file entry max_attempts mast be a number, got "' + t + '"');
                        return n
                    }
                }, default: 3
            }, cr = function (e) {
                var t = ur(e.maxAttempts);
                return D(D({}, e), {
                    maxAttempts: t, retryStrategy: function () {
                        return M(void 0, void 0, void 0, (function () {
                            var n;
                            return O(this, (function (r) {
                                switch (r.label) {
                                    case 0:
                                        return e.retryStrategy ? [2, e.retryStrategy] : (n = e.retryMode) ? [3, 2] : [4, e.retryModeProvider()];
                                    case 1:
                                        n = r.sent(), r.label = 2;
                                    case 2:
                                        return n === Qn.ADAPTIVE ? [2, new ar(t)] : [2, new rr(t)]
                                }
                            }))
                        }))
                    }
                })
            }, ur = function (e) {
                if (void 0 === e && (e = 3), "number" == typeof e) {
                    var t = Promise.resolve(e);
                    return function () {
                        return t
                    }
                }
                return e
            }, lr = {
                environmentVariableSelector: function (e) {
                    return e.AWS_RETRY_MODE
                }, configFileSelector: function (e) {
                    return e.retry_mode
                }, default: er
            }, dr = function (e, t) {
                var n, r = e.environmentVariableSelector, i = e.configFileSelector, o = e.default;
                return void 0 === t && (t = {}), Me(qe((n = r, function () {
                    return M(void 0, void 0, void 0, (function () {
                        var e;
                        return O(this, (function (t) {
                            try {
                                if (void 0 === (e = n(process.env))) throw new Error;
                                return [2, e]
                            } catch (e) {
                                throw new De(e.message || "Cannot load config from environment variables with getter: " + n)
                            }
                            return [2]
                        }))
                    }))
                }), function (e, t) {
                    void 0 === t && (t = {});
                    var n = t.preferredFile, r = void 0 === n ? "config" : n, i = q(t, ["preferredFile"]);
                    return function () {
                        return M(void 0, void 0, void 0, (function () {
                            var t, n, o, a, s, c, u, l, d, p, f;
                            return O(this, (function (m) {
                                switch (m.label) {
                                    case 0:
                                        return t = i.loadedConfig, n = void 0 === t ? fn(i) : t, o = i.profile, a = void 0 === o ? process.env.AWS_PROFILE || "default" : o, [4, n];
                                    case 1:
                                        s = m.sent(), c = s.configFile, u = s.credentialsFile, l = u[a] || {}, d = c[a] || {}, p = "config" === r ? D(D({}, l), d) : D(D({}, d), l);
                                        try {
                                            if (void 0 === (f = e(p))) throw new Error;
                                            return [2, f]
                                        } catch (t) {
                                            throw new De(t.message || "Cannot load config for profile " + a + " in SDK configuration files with getter: " + e)
                                        }
                                        return [2]
                                }
                            }))
                        }))
                    }
                }(i, t), function (e) {
                    return "function" == typeof e ? function () {
                        return M(void 0, void 0, void 0, (function () {
                            return O(this, (function (t) {
                                return [2, e()]
                            }))
                        }))
                    } : (t = e, function () {
                        return Promise.resolve(t)
                    });
                    var t
                }(o)))
            };

            function pr(e) {
                var t, n, r = [];
                try {
                    for (var i = F(Object.keys(e).sort()), o = i.next(); !o.done; o = i.next()) {
                        var a = o.value, s = e[a];
                        if (a = at(a), Array.isArray(s)) for (var c = 0, u = s.length; c < u; c++) r.push(a + "=" + at(s[c])); else {
                            var l = a;
                            (s || "string" == typeof s) && (l += "=" + at(s)), r.push(l)
                        }
                    }
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        o && !o.done && (n = i.return) && n.call(i)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return r.join("&")
            }

            const fr = require("https");
            var mr = ["ECONNRESET", "EPIPE", "ETIMEDOUT"], vr = function (e) {
                var t, n, r = {};
                try {
                    for (var i = F(Object.keys(e)), o = i.next(); !o.done; o = i.next()) {
                        var a = o.value, s = e[a];
                        r[a] = Array.isArray(s) ? s.join(",") : s
                    }
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        o && !o.done && (n = i.return) && n.call(i)
                    } finally {
                        if (t) throw t.error
                    }
                }
                return r
            };
            const gr = require("stream");

            function yr(e, t) {
                "100-continue" === (t.headers.Expect || t.headers.expect) ? e.on("continue", (function () {
                    hr(e, t.body)
                })) : hr(e, t.body)
            }

            function hr(e, t) {
                t instanceof gr.Readable ? t.pipe(e) : t ? e.end(Buffer.from(t)) : e.end()
            }

            var wr = function () {
                function e(e) {
                    var t = void 0 === e ? {} : e, n = t.connectionTimeout, r = t.socketTimeout, i = t.httpAgent,
                        o = t.httpsAgent;
                    this.metadata = {handlerProtocol: "http/1.1"}, this.connectionTimeout = n, this.socketTimeout = r, this.httpAgent = i || new jt.Agent({
                        keepAlive: !0,
                        maxSockets: 50
                    }), this.httpsAgent = o || new fr.Agent({keepAlive: !0, maxSockets: 50})
                }

                return e.prototype.destroy = function () {
                    this.httpAgent.destroy(), this.httpsAgent.destroy()
                }, e.prototype.handle = function (e, t) {
                    var n = this, r = (void 0 === t ? {} : t).abortSignal;
                    return new Promise((function (t, i) {
                        if (null == r ? void 0 : r.aborted) {
                            var o = new Error("Request aborted");
                            return o.name = "AbortError", void i(o)
                        }
                        var a = "https:" === e.protocol, s = pr(e.query || {}), c = {
                            headers: e.headers,
                            host: e.hostname,
                            method: e.method,
                            path: s ? e.path + "?" + s : e.path,
                            port: e.port,
                            agent: a ? n.httpsAgent : n.httpAgent
                        }, u = (a ? fr.request : jt.request)(c, (function (e) {
                            var n = new V({statusCode: e.statusCode || -1, headers: vr(e.headers), body: e});
                            t({response: n})
                        }));
                        u.on("error", (function (e) {
                            mr.includes(e.code) ? i(Object.assign(e, {name: "TimeoutError"})) : i(e)
                        })), function (e, t, n) {
                            void 0 === n && (n = 0), n && e.on("socket", (function (r) {
                                if (r.connecting) {
                                    var i = setTimeout((function () {
                                        e.destroy(), t(Object.assign(new Error("Socket timed out without establishing a connection within " + n + " ms"), {name: "TimeoutError"}))
                                    }), n);
                                    r.on("connect", (function () {
                                        clearTimeout(i)
                                    }))
                                }
                            }))
                        }(u, i, n.connectionTimeout), function (e, t, n) {
                            void 0 === n && (n = 0), e.setTimeout(n, (function () {
                                e.destroy(), t(Object.assign(new Error("Connection timed out after " + n + " ms"), {name: "TimeoutError"}))
                            }))
                        }(u, i, n.socketTimeout), r && (r.onabort = function () {
                            u.abort();
                            var e = new Error("Request aborted");
                            e.name = "AbortError", i(e)
                        }), yr(u, e)
                    }))
                }, e
            }();
            const br = require("http2");
            !function () {
                function e(e) {
                    var t = void 0 === e ? {} : e, n = t.requestTimeout, r = t.sessionTimeout;
                    this.metadata = {handlerProtocol: "h2"}, this.requestTimeout = n, this.sessionTimeout = r, this.connectionPool = new Map
                }

                e.prototype.destroy = function () {
                    var e, t;
                    try {
                        for (var n = F(this.connectionPool), r = n.next(); !r.done; r = n.next()) {
                            var i = $(r.value, 2);
                            i[0], i[1].destroy()
                        }
                    } catch (t) {
                        e = {error: t}
                    } finally {
                        try {
                            r && !r.done && (t = n.return) && t.call(n)
                        } finally {
                            if (e) throw e.error
                        }
                    }
                    this.connectionPool.clear()
                }, e.prototype.handle = function (e, t) {
                    var n = this, r = (void 0 === t ? {} : t).abortSignal;
                    return new Promise((function (t, i) {
                        var o, a = !1, s = function (e) {
                            a = !0, i(e)
                        };
                        if (null == r ? void 0 : r.aborted) {
                            var c = new Error("Request aborted");
                            return c.name = "AbortError", void s(c)
                        }
                        var u = e.hostname, l = e.method, d = e.port, p = e.protocol, f = e.path, m = pr(e.query || {}),
                            v = n.getSession(p + "//" + u + (d ? ":" + d : "")).request(D(D({}, e.headers), ((o = {})[br.constants.HTTP2_HEADER_PATH] = m ? f + "?" + m : f, o[br.constants.HTTP2_HEADER_METHOD] = l, o)));
                        v.on("response", (function (e) {
                            var n = new V({statusCode: e[":status"] || -1, headers: vr(e), body: v});
                            a = !0, t({response: n})
                        }));
                        var g = n.requestTimeout;
                        g && v.setTimeout(g, (function () {
                            v.close();
                            var e = new Error("Stream timed out because of no activity for " + g + " ms");
                            e.name = "TimeoutError", s(e)
                        })), r && (r.onabort = function () {
                            v.close();
                            var e = new Error("Request aborted");
                            e.name = "AbortError", s(e)
                        }), v.on("frameError", s), v.on("error", s), v.on("goaway", s), v.on("aborted", s), v.on("close", (function () {
                            a || s(new Error("Unexpected error: http2 request did not get a response"))
                        })), yr(v, e)
                    }))
                }, e.prototype.getSession = function (e) {
                    var t = this, n = this.connectionPool, r = n.get(e);
                    if (r) return r;
                    var i = (0, br.connect)(e);
                    n.set(e, i);
                    var o = function () {
                        t.destroySession(e, i)
                    };
                    i.on("goaway", o), i.on("error", o), i.on("frameError", o);
                    var a = this.sessionTimeout;
                    return a && i.setTimeout(a, (function () {
                        n.get(e) === i && (i.close(), n.delete(e))
                    })), i
                }, e.prototype.destroySession = function (e, t) {
                    this.connectionPool.get(e) === t && (this.connectionPool.delete(e), t.removeAllListeners("goaway"), t.removeAllListeners("error"), t.removeAllListeners("frameError"), t.destroyed || t.destroy())
                }
            }();
            var Er = function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.bufferedBytes = [], t
                }

                return i(t, e), t.prototype._write = function (e, t, n) {
                    this.bufferedBytes.push(e), n()
                }, t
            }(gr.Writable), Sr = function (e) {
                return new Promise((function (t, n) {
                    var r = new Er;
                    e.pipe(r), e.on("error", (function (e) {
                        r.end(), n(e)
                    })), r.on("error", n), r.on("finish", (function () {
                        var e = new Uint8Array(Buffer.concat(this.bufferedBytes));
                        t(e)
                    }))
                }))
            };

            function xr(e) {
                var t = Dn(e, "base64");
                return new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
            }

            function Ir(e) {
                return zn(e.buffer, e.byteOffset, e.byteLength).toString("base64")
            }

            function Cr(e) {
                return e ? "string" == typeof e ? Buffer.from(e).length : "number" == typeof e.byteLength ? e.byteLength : "number" == typeof e.size ? e.size : "string" == typeof e.path ? (0, sn.lstatSync)(e.path).size : void 0 : 0
            }

            const Tr = require("process");
            var Rr = function (e) {
                    var t = e.serviceId, n = e.clientVersion,
                        r = [["aws-sdk-js", n], ["os/" + (0, ln.platform)(), (0, ln.release)()], ["lang/js"], ["md/nodejs", "" + Tr.versions.node]];
                    t && r.push(["api/" + t, n]), Tr.env.AWS_EXECUTION_ENV && r.push(["exec-env/" + Tr.env.AWS_EXECUTION_ENV]);
                    var i = dr({
                        environmentVariableSelector: function (e) {
                            return e.AWS_SDK_UA_APP_ID
                        }, configFileSelector: function (e) {
                            return e["sdk-ua-app-id"]
                        }, default: void 0
                    })(), o = void 0;
                    return function () {
                        return M(void 0, void 0, void 0, (function () {
                            var e;
                            return O(this, (function (t) {
                                switch (t.label) {
                                    case 0:
                                        return o ? [3, 2] : [4, i];
                                    case 1:
                                        e = t.sent(), o = e ? j(j([], $(r)), [["app/" + e]]) : j([], $(r)), t.label = 2;
                                    case 2:
                                        return [2, o]
                                }
                            }))
                        }))
                    }
                }, Nr = function (e) {
                    var t = Dn(e, "utf8");
                    return new Uint8Array(t.buffer, t.byteOffset, t.byteLength / Uint8Array.BYTES_PER_ELEMENT)
                }, Pr = function (e) {
                    return zn(e.buffer, e.byteOffset, e.byteLength).toString("utf8")
                }, Lr = "portal.sso.{region}.amazonaws.com",
                Ar = new Set(["af-south-1", "ap-east-1", "ap-northeast-1", "ap-northeast-2", "ap-northeast-3", "ap-south-1", "ap-southeast-1", "ap-southeast-2", "ca-central-1", "eu-central-1", "eu-north-1", "eu-south-1", "eu-west-1", "eu-west-2", "eu-west-3", "me-south-1", "sa-east-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2"]),
                kr = new Set(["cn-north-1", "cn-northwest-1"]), zr = new Set(["us-iso-east-1"]),
                Dr = new Set(["us-isob-east-1"]), qr = new Set(["us-gov-east-1", "us-gov-west-1"]), Mr = function (e) {
                    var t, n = new URL(e), r = n.hostname, i = n.pathname, o = n.port, a = n.protocol, s = n.search;
                    return s && (t = function (e) {
                        var t, n, r = {};
                        if (e = e.replace(/^\?/, "")) try {
                            for (var i = F(e.split("&")), o = i.next(); !o.done; o = i.next()) {
                                var a = $(o.value.split("="), 2), s = a[0], c = a[1], u = void 0 === c ? null : c;
                                s = decodeURIComponent(s), u && (u = decodeURIComponent(u)), s in r ? Array.isArray(r[s]) ? r[s].push(u) : r[s] = [r[s], u] : r[s] = u
                            }
                        } catch (e) {
                            t = {error: e}
                        } finally {
                            try {
                                o && !o.done && (n = i.return) && n.call(i)
                            } finally {
                                if (t) throw t.error
                            }
                        }
                        return r
                    }(s)), {hostname: r, port: o ? parseInt(o) : void 0, protocol: a, path: i, query: t}
                }, Or = {
                    apiVersion: "2019-06-10", disableHostPrefix: !1, logger: {}, regionInfoProvider: function (e, t) {
                        var n = void 0;
                        switch (e) {
                            case"ap-southeast-1":
                                n = {
                                    hostname: "portal.sso.ap-southeast-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-southeast-1"
                                };
                                break;
                            case"ap-southeast-2":
                                n = {
                                    hostname: "portal.sso.ap-southeast-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-southeast-2"
                                };
                                break;
                            case"ca-central-1":
                                n = {
                                    hostname: "portal.sso.ca-central-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ca-central-1"
                                };
                                break;
                            case"eu-central-1":
                                n = {
                                    hostname: "portal.sso.eu-central-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-central-1"
                                };
                                break;
                            case"eu-west-1":
                                n = {
                                    hostname: "portal.sso.eu-west-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-west-1"
                                };
                                break;
                            case"eu-west-2":
                                n = {
                                    hostname: "portal.sso.eu-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-west-2"
                                };
                                break;
                            case"us-east-1":
                                n = {
                                    hostname: "portal.sso.us-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-1"
                                };
                                break;
                            case"us-east-2":
                                n = {
                                    hostname: "portal.sso.us-east-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-2"
                                };
                                break;
                            case"us-west-2":
                                n = {
                                    hostname: "portal.sso.us-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-2"
                                };
                                break;
                            default:
                                Ar.has(e) && (n = {
                                    hostname: Lr.replace("{region}", e),
                                    partition: "aws"
                                }), kr.has(e) && (n = {
                                    hostname: "portal.sso.{region}.amazonaws.com.cn".replace("{region}", e),
                                    partition: "aws-cn"
                                }), zr.has(e) && (n = {
                                    hostname: "portal.sso.{region}.c2s.ic.gov".replace("{region}", e),
                                    partition: "aws-iso"
                                }), Dr.has(e) && (n = {
                                    hostname: "portal.sso.{region}.sc2s.sgov.gov".replace("{region}", e),
                                    partition: "aws-iso-b"
                                }), qr.has(e) && (n = {
                                    hostname: "portal.sso.{region}.amazonaws.com".replace("{region}", e),
                                    partition: "aws-us-gov"
                                }), void 0 === n && (n = {hostname: Lr.replace("{region}", e), partition: "aws"})
                        }
                        return Promise.resolve(D({signingService: "awsssoportal"}, n))
                    }, serviceId: "SSO", urlParser: Mr
                }, Fr = D(D({}, Or), {
                    runtime: "node",
                    base64Decoder: xr,
                    base64Encoder: Ir,
                    bodyLengthChecker: Cr,
                    defaultUserAgentProvider: Rr({serviceId: Or.serviceId, clientVersion: "3.19.0"}),
                    maxAttempts: dr(sr),
                    region: dr(zt, Dt),
                    requestHandler: new wr,
                    retryModeProvider: dr(lr),
                    sha256: On.bind(null, "sha256"),
                    streamCollector: Sr,
                    utf8Decoder: Nr,
                    utf8Encoder: Pr
                }), $r = {
                    step: "build",
                    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
                    name: "contentLengthMiddleware",
                    override: !0
                }, jr = function (e) {
                    return {
                        applyToStack: function (t) {
                            t.add(function (e) {
                                var t = this;
                                return function (n) {
                                    return function (r) {
                                        return M(t, void 0, void 0, (function () {
                                            var t, i, o, a, s;
                                            return O(this, (function (c) {
                                                return t = r.request, B.isInstance(t) && (i = t.body, o = t.headers, i && -1 === Object.keys(o).map((function (e) {
                                                    return e.toLowerCase()
                                                })).indexOf("content-length") && void 0 !== (a = e(i)) && (t.headers = D(D({}, t.headers), ((s = {})["content-length"] = String(a), s)))), [2, n(D(D({}, r), {request: t}))]
                                            }))
                                        }))
                                    }
                                }
                            }(e.bodyLengthChecker), $r)
                        }
                    }
                }, _r = {name: "hostHeaderMiddleware", step: "build", priority: "low", tags: ["HOST"], override: !0},
                Ur = function (e) {
                    return {
                        applyToStack: function (t) {
                            t.add(function (e) {
                                return function (t) {
                                    return function (n) {
                                        return M(void 0, void 0, void 0, (function () {
                                            var r, i;
                                            return O(this, (function (o) {
                                                return B.isInstance(n.request) ? (r = n.request, (void 0 === (i = (e.requestHandler.metadata || {}).handlerProtocol) ? "" : i).indexOf("h2") >= 0 && !r.headers[":authority"] ? (delete r.headers.host, r.headers[":authority"] = "") : r.headers.host || (r.headers.host = r.hostname), [2, t(n)]) : [2, t(n)]
                                            }))
                                        }))
                                    }
                                }
                            }(e), _r)
                        }
                    }
                }, Vr = {name: "loggerMiddleware", tags: ["LOGGER"], step: "initialize", override: !0},
                Br = function (e) {
                    return {
                        applyToStack: function (e) {
                            e.add((function (e, t) {
                                return function (n) {
                                    return M(void 0, void 0, void 0, (function () {
                                        var r, i, o, a, s, c, u, l, d;
                                        return O(this, (function (p) {
                                            switch (p.label) {
                                                case 0:
                                                    return r = t.clientName, i = t.commandName, o = t.inputFilterSensitiveLog, a = t.logger, s = t.outputFilterSensitiveLog, [4, e(n)];
                                                case 1:
                                                    return c = p.sent(), a ? ("function" == typeof a.info && (u = c.output, l = u.$metadata, d = q(u, ["$metadata"]), a.info({
                                                        clientName: r,
                                                        commandName: i,
                                                        input: o(n.input),
                                                        output: s(d),
                                                        metadata: l
                                                    })), [2, c]) : [2, c]
                                            }
                                        }))
                                    }))
                                }
                            }), Vr)
                        }
                    }
                };

            function Hr(e) {
                return D(D({}, e), {customUserAgent: "string" == typeof e.customUserAgent ? [[e.customUserAgent]] : e.customUserAgent})
            }

            var Gr, Kr, Wr, Jr, Xr, Yr, Zr, Qr, ei, ti, ni, ri, ii, oi, ai = "user-agent", si = "x-amz-user-agent",
                ci = /[^\!\#\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g, ui = function (e) {
                    var t = $(e, 2), n = t[0], r = t[1], i = n.indexOf("/"), o = n.substring(0, i), a = n.substring(i + 1);
                    return "api" === o && (a = a.toLowerCase()), [o, a, r].filter((function (e) {
                        return e && e.length > 0
                    })).map((function (e) {
                        return null == e ? void 0 : e.replace(ci, "_")
                    })).join("/")
                }, li = {
                    name: "getUserAgentMiddleware",
                    step: "build",
                    priority: "low",
                    tags: ["SET_USER_AGENT", "USER_AGENT"],
                    override: !0
                }, di = function (e) {
                    return {
                        applyToStack: function (t) {
                            var n;
                            t.add((n = e, function (e, t) {
                                return function (r) {
                                    return M(void 0, void 0, void 0, (function () {
                                        var i, o, a, s, c, u, l, d, p;
                                        return O(this, (function (f) {
                                            switch (f.label) {
                                                case 0:
                                                    return i = r.request, B.isInstance(i) ? (o = i.headers, a = (null === (d = null == t ? void 0 : t.userAgent) || void 0 === d ? void 0 : d.map(ui)) || [], [4, n.defaultUserAgentProvider()]) : [2, e(r)];
                                                case 1:
                                                    return s = f.sent().map(ui), c = (null === (p = null == n ? void 0 : n.customUserAgent) || void 0 === p ? void 0 : p.map(ui)) || [], u = j(j(j([], $(s)), $(a)), $(c)).join(" "), l = j(j([], $(s.filter((function (e) {
                                                        return e.startsWith("aws-sdk-")
                                                    })))), $(c)).join(" "), "browser" !== n.runtime ? (l && (o[si] = o[si] ? o[ai] + " " + l : l), o[ai] = u) : o[si] = u, [2, e(D(D({}, r), {request: i}))]
                                            }
                                        }))
                                    }))
                                }
                            }), li)
                        }
                    }
                }, pi = function (e) {
                    function t(t) {
                        var n = this, r = D(D({}, Fr), t), i = qt(r), o = Lt(i), a = Hr(cr(o));
                        return (n = e.call(this, a) || this).config = a, n.middlewareStack.use(jn(n.config)), n.middlewareStack.use(jr(n.config)), n.middlewareStack.use(Ur(n.config)), n.middlewareStack.use(Br(n.config)), n.middlewareStack.use(di(n.config)), n
                    }

                    return i(t, e), t.prototype.destroy = function () {
                        e.prototype.destroy.call(this)
                    }, t
                }(W);
            !function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Gr || (Gr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D(D({}, e), e.accessToken && {accessToken: Q})
                }
            }(Kr || (Kr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D(D(D({}, e), e.secretAccessKey && {secretAccessKey: Q}), e.sessionToken && {sessionToken: Q})
                }
            }(Wr || (Wr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D(D({}, e), e.roleCredentials && {roleCredentials: Wr.filterSensitiveLog(e.roleCredentials)})
                }
            }(Jr || (Jr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Xr || (Xr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Yr || (Yr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Zr || (Zr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Qr || (Qr = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D(D({}, e), e.accessToken && {accessToken: Q})
                }
            }(ei || (ei = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ti || (ti = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ni || (ni = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D(D({}, e), e.accessToken && {accessToken: Q})
                }
            }(ri || (ri = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ii || (ii = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D(D({}, e), e.accessToken && {accessToken: Q})
                }
            }(oi || (oi = {}));
            var fi, mi, vi, gi, yi, hi, wi, bi, Ei, Si, xi, Ii, Ci, Ti, Ri, Ni, Pi, Li, Ai, ki, zi, Di, qi, Mi, Oi, Fi,
                $i, ji, _i, Ui, Vi, Bi, Hi, Gi, Ki, Wi, Ji, Xi, Yi, Zi, Qi, eo, to, no, ro, io, oo, ao, so, co, uo, lo,
                po, fo, mo, vo, go, yo, ho, wo, bo, Eo, So, xo, Io, Co, To, Ro, No, Po, Lo, Ao, ko, zo, Do, qo, Mo, Oo,
                Fo, $o, jo, _o, Uo, Vo, Bo, Ho, Go, Ko, Wo, Jo, Xo, Yo, Zo, Qo, ea, ta, na, ra, ia, oa, aa, sa, ca, ua,
                la, da, pa, fa, ma, va, ga, ya, ha, wa, ba, Ea, Sa, xa, Ia, Ca, Ta, Ra, Na, Pa, La, Aa, ka, za, Da, qa,
                Ma, Oa, Fa, $a, ja = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var n, r, i, o, a, s, c, u, l, d, p;
                        return O(this, (function (f) {
                            switch (f.label) {
                                case 0:
                                    return r = [D({}, e)], p = {}, [4, Ga(e.body, t)];
                                case 1:
                                    switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Ka(e, n.body)) {
                                        case"InvalidRequestException":
                                        case"com.amazonaws.sso#InvalidRequestException":
                                            return [3, 2];
                                        case"ResourceNotFoundException":
                                        case"com.amazonaws.sso#ResourceNotFoundException":
                                            return [3, 4];
                                        case"TooManyRequestsException":
                                        case"com.amazonaws.sso#TooManyRequestsException":
                                            return [3, 6];
                                        case"UnauthorizedException":
                                        case"com.amazonaws.sso#UnauthorizedException":
                                            return [3, 8]
                                    }
                                    return [3, 10];
                                case 2:
                                    return a = [{}], [4, _a(n, t)];
                                case 3:
                                    return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ha(e)
                                    }]), [3, 11];
                                case 4:
                                    return s = [{}], [4, Ua(n, t)];
                                case 5:
                                    return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ha(e)
                                    }]), [3, 11];
                                case 6:
                                    return c = [{}], [4, Va(n, t)];
                                case 7:
                                    return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ha(e)
                                    }]), [3, 11];
                                case 8:
                                    return u = [{}], [4, Ba(n, t)];
                                case 9:
                                    return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                        name: o,
                                        $metadata: Ha(e)
                                    }]), [3, 11];
                                case 10:
                                    l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                        name: "" + o,
                                        message: l.message || l.Message || o,
                                        $fault: "client",
                                        $metadata: Ha(e)
                                    }), f.label = 11;
                                case 11:
                                    return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                            }
                        }))
                    }))
                }, _a = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var t, n;
                        return O(this, (function (r) {
                            return t = {
                                name: "InvalidRequestException",
                                $fault: "client",
                                $metadata: Ha(e),
                                message: void 0
                            }, void 0 !== (n = e.body).message && null !== n.message && (t.message = n.message), [2, t]
                        }))
                    }))
                }, Ua = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var t, n;
                        return O(this, (function (r) {
                            return t = {
                                name: "ResourceNotFoundException",
                                $fault: "client",
                                $metadata: Ha(e),
                                message: void 0
                            }, void 0 !== (n = e.body).message && null !== n.message && (t.message = n.message), [2, t]
                        }))
                    }))
                }, Va = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var t, n;
                        return O(this, (function (r) {
                            return t = {
                                name: "TooManyRequestsException",
                                $fault: "client",
                                $metadata: Ha(e),
                                message: void 0
                            }, void 0 !== (n = e.body).message && null !== n.message && (t.message = n.message), [2, t]
                        }))
                    }))
                }, Ba = function (e, t) {
                    return M(void 0, void 0, void 0, (function () {
                        var t, n;
                        return O(this, (function (r) {
                            return t = {
                                name: "UnauthorizedException",
                                $fault: "client",
                                $metadata: Ha(e),
                                message: void 0
                            }, void 0 !== (n = e.body).message && null !== n.message && (t.message = n.message), [2, t]
                        }))
                    }))
                }, Ha = function (e) {
                    var t;
                    return {
                        httpStatusCode: e.statusCode,
                        requestId: null !== (t = e.headers["x-amzn-requestid"]) && void 0 !== t ? t : e.headers["x-amzn-request-id"],
                        extendedRequestId: e.headers["x-amz-id-2"],
                        cfId: e.headers["x-amz-cf-id"]
                    }
                }, Ga = function (e, t) {
                    return function (e, t) {
                        return function (e, t) {
                            return void 0 === e && (e = new Uint8Array), e instanceof Uint8Array ? Promise.resolve(e) : t.streamCollector(e) || Promise.resolve(new Uint8Array)
                        }(e, t).then((function (e) {
                            return t.utf8Encoder(e)
                        }))
                    }(e, t).then((function (e) {
                        return e.length ? JSON.parse(e) : {}
                    }))
                }, Ka = function (e, t) {
                    var n, r = function (e) {
                        var t = e;
                        return t.indexOf(":") >= 0 && (t = t.split(":")[0]), t.indexOf("#") >= 0 && (t = t.split("#")[1]), t
                    }, i = (n = e.headers, "x-amzn-errortype", Object.keys(n).find((function (e) {
                        return e.toLowerCase() === "x-amzn-errortype".toLowerCase()
                    })));
                    return void 0 !== i ? r(e.headers[i]) : void 0 !== t.code ? r(t.code) : void 0 !== t.__type ? r(t.__type) : ""
                }, Wa = function (e) {
                    function t(t) {
                        var n = e.call(this) || this;
                        return n.input = t, n
                    }

                    return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                        this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                        var r = e.concat(this.middlewareStack), i = {
                            logger: t.logger,
                            clientName: "SSOClient",
                            commandName: "GetRoleCredentialsCommand",
                            inputFilterSensitiveLog: Kr.filterSensitiveLog,
                            outputFilterSensitiveLog: Jr.filterSensitiveLog
                        }, o = t.requestHandler;
                        return r.resolve((function (e) {
                            return o.handle(e.request, n || {})
                        }), i)
                    }, t.prototype.serialize = function (e, t) {
                        return function (e, t) {
                            return M(void 0, void 0, void 0, (function () {
                                var n, r, i, o, a, s, c, u;
                                return O(this, (function (l) {
                                    switch (l.label) {
                                        case 0:
                                            return n = D({}, !(null == (d = e.accessToken) || "" === d || Object.getOwnPropertyNames(d).includes("length") && 0 == d.length || Object.getOwnPropertyNames(d).includes("size") && 0 == d.size) && {"x-amz-sso_bearer_token": e.accessToken}), r = "/federation/credentials", i = D(D({}, void 0 !== e.roleName && {role_name: e.roleName}), void 0 !== e.accountId && {account_id: e.accountId}), [4, t.endpoint()];
                                        case 1:
                                            return o = l.sent(), a = o.hostname, s = o.protocol, c = void 0 === s ? "https" : s, u = o.port, [2, new B({
                                                protocol: c,
                                                hostname: a,
                                                port: u,
                                                method: "GET",
                                                headers: n,
                                                path: r,
                                                query: i,
                                                body: void 0
                                            })]
                                    }
                                    var d
                                }))
                            }))
                        }(e, t)
                    }, t.prototype.deserialize = function (e, t) {
                        return function (e, t) {
                            return M(void 0, void 0, void 0, (function () {
                                var n, r;
                                return O(this, (function (i) {
                                    switch (i.label) {
                                        case 0:
                                            return 200 !== e.statusCode && e.statusCode >= 300 ? [2, ja(e, t)] : (n = {
                                                $metadata: Ha(e),
                                                roleCredentials: void 0
                                            }, [4, Ga(e.body, t)]);
                                        case 1:
                                            return void 0 !== (r = i.sent()).roleCredentials && null !== r.roleCredentials && (n.roleCredentials = function (e, t) {
                                                return {
                                                    accessKeyId: void 0 !== e.accessKeyId && null !== e.accessKeyId ? e.accessKeyId : void 0,
                                                    expiration: void 0 !== e.expiration && null !== e.expiration ? e.expiration : void 0,
                                                    secretAccessKey: void 0 !== e.secretAccessKey && null !== e.secretAccessKey ? e.secretAccessKey : void 0,
                                                    sessionToken: void 0 !== e.sessionToken && null !== e.sessionToken ? e.sessionToken : void 0
                                                }
                                            }(r.roleCredentials)), [2, Promise.resolve(n)]
                                    }
                                }))
                            }))
                        }(e, t)
                    }, t
                }(J), Ja = !1, Xa = function (e) {
                    return void 0 === e && (e = {}), function () {
                        return M(void 0, void 0, void 0, (function () {
                            var t;
                            return O(this, (function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, xn(e)];
                                    case 1:
                                        return t = n.sent(), [2, Ya(In(e), t, e)]
                                }
                            }))
                        }))
                    }
                }, Ya = function (e, t, n) {
                    return M(void 0, void 0, void 0, (function () {
                        var r, i, o, a, s, c, u, l, d, p, f, m, v, g, y, h, w, b, E;
                        return O(this, (function (S) {
                            switch (S.label) {
                                case 0:
                                    if (!(r = t[e])) throw new De("Profile " + e + " could not be found in shared credentials file.");
                                    if (i = r.sso_start_url, o = r.sso_account_id, a = r.sso_region, s = r.sso_role_name, !(i || o || a || s)) throw new De("Profile " + e + " is not configured with SSO credentials.");
                                    if (!(i && o && a && s)) throw new De("Profile " + e + ' does not have valid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html', Ja);
                                    c = (0, qn.createHash)("sha1"), u = c.update(i).digest("hex"), l = (0, dn.join)(wn(), ".aws", "sso", "cache", u + ".json");
                                    try {
                                        if (d = JSON.parse((0, sn.readFileSync)(l, {encoding: "utf-8"})), new Date(d.expiresAt).getTime() - Date.now() <= 9e5) throw new Error("SSO token is expired.")
                                    } catch (e) {
                                        throw new De("The SSO session associated with this profile has expired or is otherwise invalid. To refresh this SSO session run aws sso login with the corresponding profile.", Ja)
                                    }
                                    p = d.accessToken, f = n.ssoClient || new pi({region: a}), S.label = 1;
                                case 1:
                                    return S.trys.push([1, 3, , 4]), [4, f.send(new Wa({
                                        accountId: o,
                                        roleName: s,
                                        accessToken: p
                                    }))];
                                case 2:
                                    return m = S.sent(), [3, 4];
                                case 3:
                                    throw v = S.sent(), De.from(v, Ja);
                                case 4:
                                    if (g = m.roleCredentials, h = (y = void 0 === g ? {} : g).accessKeyId, w = y.secretAccessKey, b = y.sessionToken, E = y.expiration, !(h && w && b && E)) throw new De("SSO returns an invalid temporary credential.", Ja);
                                    return [2, {
                                        accessKeyId: h,
                                        secretAccessKey: w,
                                        sessionToken: b,
                                        expiration: new Date(E)
                                    }]
                            }
                        }))
                    }))
                }, Za = function (e) {
                    void 0 === e && (e = {});
                    var t = D({profile: process.env.AWS_PROFILE}, e);
                    t.loadedConfig || (t.loadedConfig = fn(e));
                    var n = [Xa(t), Sn(t), Ln(t), cn(t), Qa(t), function () {
                        return M(void 0, void 0, void 0, (function () {
                            return O(this, (function (e) {
                                throw new De("Could not load credentials from any providers", !1)
                            }))
                        }))
                    }];
                    t.profile || n.unshift(Ot());
                    var r = qe.apply(void 0, j([], $(n)));
                    return Me(r, (function (e) {
                        return void 0 !== e.expiration && e.expiration.getTime() - Date.now() < 3e5
                    }), (function (e) {
                        return void 0 !== e.expiration
                    }))
                }, Qa = function (e) {
                    return process.env[Kt] || process.env[Gt] ? Jt(e) : process.env.AWS_EC2_METADATA_DISABLED ? function () {
                        return Promise.reject(new De("EC2 Instance Metadata Service access disabled"))
                    } : nn(e)
                }, es = "sts.{region}.amazonaws.com",
                ts = new Set(["af-south-1", "ap-east-1", "ap-northeast-1", "ap-northeast-2", "ap-northeast-3", "ap-south-1", "ap-southeast-1", "ap-southeast-2", "ca-central-1", "eu-central-1", "eu-north-1", "eu-south-1", "eu-west-1", "eu-west-2", "eu-west-3", "me-south-1", "sa-east-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2"]),
                ns = new Set(["cn-north-1", "cn-northwest-1"]), rs = new Set(["us-iso-east-1"]),
                is = new Set(["us-isob-east-1"]), os = new Set(["us-gov-east-1", "us-gov-west-1"]), as = {
                    apiVersion: "2011-06-15", disableHostPrefix: !1, logger: {}, regionInfoProvider: function (e, t) {
                        var n = void 0;
                        switch (e) {
                            case"af-south-1":
                                n = {hostname: "sts.af-south-1.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-east-1":
                                n = {hostname: "sts.ap-east-1.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-northeast-1":
                                n = {hostname: "sts.ap-northeast-1.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-northeast-2":
                                n = {hostname: "sts.ap-northeast-2.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-northeast-3":
                                n = {hostname: "sts.ap-northeast-3.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-south-1":
                                n = {hostname: "sts.ap-south-1.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-southeast-1":
                                n = {hostname: "sts.ap-southeast-1.amazonaws.com", partition: "aws"};
                                break;
                            case"ap-southeast-2":
                                n = {hostname: "sts.ap-southeast-2.amazonaws.com", partition: "aws"};
                                break;
                            case"aws-global":
                                n = {hostname: "sts.amazonaws.com", partition: "aws", signingRegion: "us-east-1"};
                                break;
                            case"ca-central-1":
                                n = {hostname: "sts.ca-central-1.amazonaws.com", partition: "aws"};
                                break;
                            case"cn-north-1":
                                n = {hostname: "sts.cn-north-1.amazonaws.com.cn", partition: "aws-cn"};
                                break;
                            case"cn-northwest-1":
                                n = {hostname: "sts.cn-northwest-1.amazonaws.com.cn", partition: "aws-cn"};
                                break;
                            case"eu-central-1":
                                n = {hostname: "sts.eu-central-1.amazonaws.com", partition: "aws"};
                                break;
                            case"eu-north-1":
                                n = {hostname: "sts.eu-north-1.amazonaws.com", partition: "aws"};
                                break;
                            case"eu-south-1":
                                n = {hostname: "sts.eu-south-1.amazonaws.com", partition: "aws"};
                                break;
                            case"eu-west-1":
                                n = {hostname: "sts.eu-west-1.amazonaws.com", partition: "aws"};
                                break;
                            case"eu-west-2":
                                n = {hostname: "sts.eu-west-2.amazonaws.com", partition: "aws"};
                                break;
                            case"eu-west-3":
                                n = {hostname: "sts.eu-west-3.amazonaws.com", partition: "aws"};
                                break;
                            case"me-south-1":
                                n = {hostname: "sts.me-south-1.amazonaws.com", partition: "aws"};
                                break;
                            case"sa-east-1":
                                n = {hostname: "sts.sa-east-1.amazonaws.com", partition: "aws"};
                                break;
                            case"us-east-1":
                                n = {hostname: "sts.us-east-1.amazonaws.com", partition: "aws"};
                                break;
                            case"us-east-1-fips":
                                n = {
                                    hostname: "sts-fips.us-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-1"
                                };
                                break;
                            case"us-east-2":
                                n = {hostname: "sts.us-east-2.amazonaws.com", partition: "aws"};
                                break;
                            case"us-east-2-fips":
                                n = {
                                    hostname: "sts-fips.us-east-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-2"
                                };
                                break;
                            case"us-gov-east-1":
                                n = {hostname: "sts.us-gov-east-1.amazonaws.com", partition: "aws-us-gov"};
                                break;
                            case"us-gov-east-1-fips":
                                n = {
                                    hostname: "sts.us-gov-east-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-east-1"
                                };
                                break;
                            case"us-gov-west-1":
                                n = {hostname: "sts.us-gov-west-1.amazonaws.com", partition: "aws-us-gov"};
                                break;
                            case"us-gov-west-1-fips":
                                n = {
                                    hostname: "sts.us-gov-west-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-west-1"
                                };
                                break;
                            case"us-iso-east-1":
                                n = {hostname: "sts.us-iso-east-1.c2s.ic.gov", partition: "aws-iso"};
                                break;
                            case"us-isob-east-1":
                                n = {hostname: "sts.us-isob-east-1.sc2s.sgov.gov", partition: "aws-iso-b"};
                                break;
                            case"us-west-1":
                                n = {hostname: "sts.us-west-1.amazonaws.com", partition: "aws"};
                                break;
                            case"us-west-1-fips":
                                n = {
                                    hostname: "sts-fips.us-west-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-1"
                                };
                                break;
                            case"us-west-2":
                                n = {hostname: "sts.us-west-2.amazonaws.com", partition: "aws"};
                                break;
                            case"us-west-2-fips":
                                n = {
                                    hostname: "sts-fips.us-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-2"
                                };
                                break;
                            default:
                                ts.has(e) && (n = {
                                    hostname: es.replace("{region}", e),
                                    partition: "aws"
                                }), ns.has(e) && (n = {
                                    hostname: "sts.{region}.amazonaws.com.cn".replace("{region}", e),
                                    partition: "aws-cn"
                                }), rs.has(e) && (n = {
                                    hostname: "sts.{region}.c2s.ic.gov".replace("{region}", e),
                                    partition: "aws-iso"
                                }), is.has(e) && (n = {
                                    hostname: "sts.{region}.sc2s.sgov.gov".replace("{region}", e),
                                    partition: "aws-iso-b"
                                }), os.has(e) && (n = {
                                    hostname: "sts.{region}.amazonaws.com".replace("{region}", e),
                                    partition: "aws-us-gov"
                                }), void 0 === n && (n = {hostname: es.replace("{region}", e), partition: "aws"})
                        }
                        return Promise.resolve(D({signingService: "sts"}, n))
                    }, serviceId: "STS", urlParser: Mr
                }, ss = D(D({}, as), {
                    runtime: "node",
                    base64Decoder: xr,
                    base64Encoder: Ir,
                    bodyLengthChecker: Cr,
                    credentialDefaultProvider: (fi = Za, function (e) {
                        return fi(D({
                            roleAssumer: Nt(e, e.stsClientCtor),
                            roleAssumerWithWebIdentity: Pt(e, e.stsClientCtor)
                        }, e))
                    }),
                    defaultUserAgentProvider: Rr({serviceId: as.serviceId, clientVersion: "3.19.0"}),
                    maxAttempts: dr(sr),
                    region: dr(zt, Dt),
                    requestHandler: new wr,
                    retryModeProvider: dr(lr),
                    sha256: On.bind(null, "sha256"),
                    streamCollector: Sr,
                    utf8Decoder: Nr,
                    utf8Encoder: Pr
                }), cs = function (e) {
                    function t(n) {
                        var r, i = this, o = D(D({}, ss), n), a = qt(o), s = Lt(a), c = cr(s),
                            u = Hr((r = t, ht(D(D({}, c), {stsClientCtor: r}))));
                        return (i = e.call(this, u) || this).config = u, i.middlewareStack.use(jn(i.config)), i.middlewareStack.use(jr(i.config)), i.middlewareStack.use(Ur(i.config)), i.middlewareStack.use(Br(i.config)), i.middlewareStack.use(di(i.config)), i
                    }

                    return i(t, e), t.prototype.destroy = function () {
                        e.prototype.destroy.call(this)
                    }, t
                }(W), us = function (e) {
                    return void 0 === e && (e = {}), Pt(e, cs)
                }, ls = "api.ecr.{region}.amazonaws.com",
                ds = new Set(["af-south-1", "ap-east-1", "ap-northeast-1", "ap-northeast-2", "ap-northeast-3", "ap-south-1", "ap-southeast-1", "ap-southeast-2", "ca-central-1", "eu-central-1", "eu-north-1", "eu-south-1", "eu-west-1", "eu-west-2", "eu-west-3", "me-south-1", "sa-east-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2"]),
                ps = new Set(["cn-north-1", "cn-northwest-1"]), fs = new Set(["us-iso-east-1"]),
                ms = new Set(["us-isob-east-1"]), vs = new Set(["us-gov-east-1", "us-gov-west-1"]), gs = {
                    apiVersion: "2015-09-21", disableHostPrefix: !1, logger: {}, regionInfoProvider: function (e, t) {
                        var n = void 0;
                        switch (e) {
                            case"af-south-1":
                                n = {
                                    hostname: "api.ecr.af-south-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "af-south-1"
                                };
                                break;
                            case"ap-east-1":
                                n = {
                                    hostname: "api.ecr.ap-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-east-1"
                                };
                                break;
                            case"ap-northeast-1":
                                n = {
                                    hostname: "api.ecr.ap-northeast-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-northeast-1"
                                };
                                break;
                            case"ap-northeast-2":
                                n = {
                                    hostname: "api.ecr.ap-northeast-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-northeast-2"
                                };
                                break;
                            case"ap-northeast-3":
                                n = {
                                    hostname: "api.ecr.ap-northeast-3.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-northeast-3"
                                };
                                break;
                            case"ap-south-1":
                                n = {
                                    hostname: "api.ecr.ap-south-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-south-1"
                                };
                                break;
                            case"ap-southeast-1":
                                n = {
                                    hostname: "api.ecr.ap-southeast-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-southeast-1"
                                };
                                break;
                            case"ap-southeast-2":
                                n = {
                                    hostname: "api.ecr.ap-southeast-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ap-southeast-2"
                                };
                                break;
                            case"ca-central-1":
                                n = {
                                    hostname: "api.ecr.ca-central-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "ca-central-1"
                                };
                                break;
                            case"cn-north-1":
                                n = {
                                    hostname: "api.ecr.cn-north-1.amazonaws.com.cn",
                                    partition: "aws-cn",
                                    signingRegion: "cn-north-1"
                                };
                                break;
                            case"cn-northwest-1":
                                n = {
                                    hostname: "api.ecr.cn-northwest-1.amazonaws.com.cn",
                                    partition: "aws-cn",
                                    signingRegion: "cn-northwest-1"
                                };
                                break;
                            case"eu-central-1":
                                n = {
                                    hostname: "api.ecr.eu-central-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-central-1"
                                };
                                break;
                            case"eu-north-1":
                                n = {
                                    hostname: "api.ecr.eu-north-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-north-1"
                                };
                                break;
                            case"eu-south-1":
                                n = {
                                    hostname: "api.ecr.eu-south-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-south-1"
                                };
                                break;
                            case"eu-west-1":
                                n = {
                                    hostname: "api.ecr.eu-west-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-west-1"
                                };
                                break;
                            case"eu-west-2":
                                n = {
                                    hostname: "api.ecr.eu-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-west-2"
                                };
                                break;
                            case"eu-west-3":
                                n = {
                                    hostname: "api.ecr.eu-west-3.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "eu-west-3"
                                };
                                break;
                            case"fips-dkr-us-east-1":
                                n = {
                                    hostname: "ecr-fips.us-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-1"
                                };
                                break;
                            case"fips-dkr-us-east-2":
                                n = {
                                    hostname: "ecr-fips.us-east-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-2"
                                };
                                break;
                            case"fips-dkr-us-gov-east-1":
                                n = {
                                    hostname: "ecr-fips.us-gov-east-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-east-1"
                                };
                                break;
                            case"fips-dkr-us-gov-west-1":
                                n = {
                                    hostname: "ecr-fips.us-gov-west-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-west-1"
                                };
                                break;
                            case"fips-dkr-us-west-1":
                                n = {
                                    hostname: "ecr-fips.us-west-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-1"
                                };
                                break;
                            case"fips-dkr-us-west-2":
                                n = {
                                    hostname: "ecr-fips.us-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-2"
                                };
                                break;
                            case"fips-us-east-1":
                                n = {
                                    hostname: "ecr-fips.us-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-1"
                                };
                                break;
                            case"fips-us-east-2":
                                n = {
                                    hostname: "ecr-fips.us-east-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-2"
                                };
                                break;
                            case"fips-us-gov-east-1":
                                n = {
                                    hostname: "ecr-fips.us-gov-east-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-east-1"
                                };
                                break;
                            case"fips-us-gov-west-1":
                                n = {
                                    hostname: "ecr-fips.us-gov-west-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-west-1"
                                };
                                break;
                            case"fips-us-west-1":
                                n = {
                                    hostname: "ecr-fips.us-west-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-1"
                                };
                                break;
                            case"fips-us-west-2":
                                n = {
                                    hostname: "ecr-fips.us-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-2"
                                };
                                break;
                            case"me-south-1":
                                n = {
                                    hostname: "api.ecr.me-south-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "me-south-1"
                                };
                                break;
                            case"sa-east-1":
                                n = {
                                    hostname: "api.ecr.sa-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "sa-east-1"
                                };
                                break;
                            case"us-east-1":
                                n = {
                                    hostname: "api.ecr.us-east-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-1"
                                };
                                break;
                            case"us-east-2":
                                n = {
                                    hostname: "api.ecr.us-east-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-east-2"
                                };
                                break;
                            case"us-gov-east-1":
                                n = {
                                    hostname: "api.ecr.us-gov-east-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-east-1"
                                };
                                break;
                            case"us-gov-west-1":
                                n = {
                                    hostname: "api.ecr.us-gov-west-1.amazonaws.com",
                                    partition: "aws-us-gov",
                                    signingRegion: "us-gov-west-1"
                                };
                                break;
                            case"us-iso-east-1":
                                n = {
                                    hostname: "api.ecr.us-iso-east-1.c2s.ic.gov",
                                    partition: "aws-iso",
                                    signingRegion: "us-iso-east-1"
                                };
                                break;
                            case"us-isob-east-1":
                                n = {
                                    hostname: "api.ecr.us-isob-east-1.sc2s.sgov.gov",
                                    partition: "aws-iso-b",
                                    signingRegion: "us-isob-east-1"
                                };
                                break;
                            case"us-west-1":
                                n = {
                                    hostname: "api.ecr.us-west-1.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-1"
                                };
                                break;
                            case"us-west-2":
                                n = {
                                    hostname: "api.ecr.us-west-2.amazonaws.com",
                                    partition: "aws",
                                    signingRegion: "us-west-2"
                                };
                                break;
                            default:
                                ds.has(e) && (n = {
                                    hostname: ls.replace("{region}", e),
                                    partition: "aws"
                                }), ps.has(e) && (n = {
                                    hostname: "api.ecr.{region}.amazonaws.com.cn".replace("{region}", e),
                                    partition: "aws-cn"
                                }), fs.has(e) && (n = {
                                    hostname: "api.ecr.{region}.c2s.ic.gov".replace("{region}", e),
                                    partition: "aws-iso"
                                }), ms.has(e) && (n = {
                                    hostname: "api.ecr.{region}.sc2s.sgov.gov".replace("{region}", e),
                                    partition: "aws-iso-b"
                                }), vs.has(e) && (n = {
                                    hostname: "api.ecr.{region}.amazonaws.com".replace("{region}", e),
                                    partition: "aws-us-gov"
                                }), void 0 === n && (n = {hostname: ls.replace("{region}", e), partition: "aws"})
                        }
                        return Promise.resolve(D({signingService: "ecr"}, n))
                    }, serviceId: "ECR", urlParser: Mr
                }, ys = D(D({}, gs), {
                    runtime: "node",
                    base64Decoder: xr,
                    base64Encoder: Ir,
                    bodyLengthChecker: Cr,
                    credentialDefaultProvider: function (e) {
                        return function (t) {
                            return e(D({
                                roleAssumer: (n = t, void 0 === n && (n = {}), Nt(n, cs)),
                                roleAssumerWithWebIdentity: us(t)
                            }, t));
                            var n
                        }
                    }(Za),
                    defaultUserAgentProvider: Rr({serviceId: gs.serviceId, clientVersion: "3.19.0"}),
                    maxAttempts: dr(sr),
                    region: dr(zt, Dt),
                    requestHandler: new wr,
                    retryModeProvider: dr(lr),
                    sha256: On.bind(null, "sha256"),
                    streamCollector: Sr,
                    utf8Decoder: Nr,
                    utf8Encoder: Pr
                }), hs = function (e) {
                    function t(t) {
                        var n = this, r = D(D({}, ys), t), i = qt(r), o = Lt(i), a = cr(o), s = Hr(ht(a));
                        return (n = e.call(this, s) || this).config = s, n.middlewareStack.use(jn(n.config)), n.middlewareStack.use(jr(n.config)), n.middlewareStack.use(Ur(n.config)), n.middlewareStack.use(Br(n.config)), n.middlewareStack.use(xt(n.config)), n.middlewareStack.use(di(n.config)), n
                    }

                    return i(t, e), t.prototype.destroy = function () {
                        e.prototype.destroy.call(this)
                    }, t
                }(W);
            !function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(mi || (mi = {})), function (e) {
                e.InvalidLayerDigest = "InvalidLayerDigest", e.MissingLayerDigest = "MissingLayerDigest"
            }(vi || (vi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(gi || (gi = {})), function (e) {
                e.AVAILABLE = "AVAILABLE", e.UNAVAILABLE = "UNAVAILABLE"
            }(yi || (yi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(hi || (hi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(wi || (wi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(bi || (bi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ei || (Ei = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Si || (Si = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(xi || (xi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ii || (Ii = {})), function (e) {
                e.ImageNotFound = "ImageNotFound", e.ImageReferencedByManifestList = "ImageReferencedByManifestList", e.ImageTagDoesNotMatchDigest = "ImageTagDoesNotMatchDigest", e.InvalidImageDigest = "InvalidImageDigest", e.InvalidImageTag = "InvalidImageTag", e.KmsError = "KmsError", e.MissingDigestAndTag = "MissingDigestAndTag"
            }(Ci || (Ci = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ti || (Ti = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ri || (Ri = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ni || (Ni = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Pi || (Pi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Li || (Li = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ai || (Ai = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ki || (ki = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(zi || (zi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Di || (Di = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(qi || (qi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Mi || (Mi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Oi || (Oi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Fi || (Fi = {})), function (e) {
                e.AES256 = "AES256", e.KMS = "KMS"
            }($i || ($i = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ji || (ji = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(_i || (_i = {})), function (e) {
                e.IMMUTABLE = "IMMUTABLE", e.MUTABLE = "MUTABLE"
            }(Ui || (Ui = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Vi || (Vi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Bi || (Bi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Hi || (Hi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Gi || (Gi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ki || (Ki = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Wi || (Wi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ji || (Ji = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Xi || (Xi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Yi || (Yi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Zi || (Zi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Qi || (Qi = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(eo || (eo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(to || (to = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(no || (no = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ro || (ro = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(io || (io = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(oo || (oo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ao || (ao = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(so || (so = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(co || (co = {})), function (e) {
                e.ANY = "ANY", e.TAGGED = "TAGGED", e.UNTAGGED = "UNTAGGED"
            }(uo || (uo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(lo || (lo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(po || (po = {})), function (e) {
                e.CRITICAL = "CRITICAL", e.HIGH = "HIGH", e.INFORMATIONAL = "INFORMATIONAL", e.LOW = "LOW", e.MEDIUM = "MEDIUM", e.UNDEFINED = "UNDEFINED"
            }(fo || (fo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(mo || (mo = {})), function (e) {
                e.COMPLETE = "COMPLETE", e.FAILED = "FAILED", e.IN_PROGRESS = "IN_PROGRESS"
            }(vo || (vo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(go || (go = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(yo || (yo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ho || (ho = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(wo || (wo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(bo || (bo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Eo || (Eo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(So || (So = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(xo || (xo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Io || (Io = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Co || (Co = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(To || (To = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ro || (Ro = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(No || (No = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Po || (Po = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Lo || (Lo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ao || (Ao = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ko || (ko = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(zo || (zo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Do || (Do = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(qo || (qo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Mo || (Mo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Oo || (Oo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Fo || (Fo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }($o || ($o = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(jo || (jo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(_o || (_o = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Uo || (Uo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Vo || (Vo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Bo || (Bo = {})), function (e) {
                e.EXPIRE = "EXPIRE"
            }(Ho || (Ho = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Go || (Go = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ko || (Ko = {})), function (e) {
                e.COMPLETE = "COMPLETE", e.EXPIRED = "EXPIRED", e.FAILED = "FAILED", e.IN_PROGRESS = "IN_PROGRESS"
            }(Wo || (Wo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Jo || (Jo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Xo || (Xo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Yo || (Yo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Zo || (Zo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Qo || (Qo = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ea || (ea = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ta || (ta = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(na || (na = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ra || (ra = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ia || (ia = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(oa || (oa = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(aa || (aa = {})), function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(sa || (sa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ca || (ca = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ua || (ua = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(la || (la = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(da || (da = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(pa || (pa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(fa || (fa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ma || (ma = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(va || (va = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ga || (ga = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ya || (ya = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ha || (ha = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(wa || (wa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ba || (ba = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ea || (Ea = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Sa || (Sa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(xa || (xa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ia || (Ia = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ca || (Ca = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ta || (Ta = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ra || (Ra = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Na || (Na = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Pa || (Pa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(La || (La = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Aa || (Aa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(ka || (ka = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(za || (za = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Da || (Da = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(qa || (qa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Ma || (Ma = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Oa || (Oa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }(Fa || (Fa = {})),function (e) {
                e.filterSensitiveLog = function (e) {
                    return D({}, e)
                }
            }($a || ($a = {}));
            var ws = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, bs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Es = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Ss = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f, m, v, g, y;
                    return O(this, (function (h) {
                        switch (h.label) {
                            case 0:
                                return r = [D({}, e)], y = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(y.body = h.sent(), y)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"EmptyUploadException":
                                    case"com.amazonaws.ecr#EmptyUploadException":
                                        return [3, 2];
                                    case"InvalidLayerException":
                                    case"com.amazonaws.ecr#InvalidLayerException":
                                        return [3, 4];
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 6];
                                    case"KmsException":
                                    case"com.amazonaws.ecr#KmsException":
                                        return [3, 8];
                                    case"LayerAlreadyExistsException":
                                    case"com.amazonaws.ecr#LayerAlreadyExistsException":
                                        return [3, 10];
                                    case"LayerPartTooSmallException":
                                    case"com.amazonaws.ecr#LayerPartTooSmallException":
                                        return [3, 12];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 14];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 16];
                                    case"UploadNotFoundException":
                                    case"com.amazonaws.ecr#UploadNotFoundException":
                                        return [3, 18]
                                }
                                return [3, 20];
                            case 2:
                                return a = [{}], [4, Qs(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 4:
                                return s = [{}], [4, ic(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 6:
                                return c = [{}], [4, ac(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 8:
                                return u = [{}], [4, cc(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 10:
                                return l = [{}], [4, uc(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 12:
                                return d = [{}], [4, dc(n, t)];
                            case 13:
                                return i = D.apply(void 0, [D.apply(void 0, d.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 14:
                                return p = [{}], [4, Ec(n, t)];
                            case 15:
                                return i = D.apply(void 0, [D.apply(void 0, p.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 16:
                                return f = [{}], [4, Ic(n, t)];
                            case 17:
                                return i = D.apply(void 0, [D.apply(void 0, f.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 18:
                                return m = [{}], [4, Rc(n, t)];
                            case 19:
                                return i = D.apply(void 0, [D.apply(void 0, m.concat([h.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 21];
                            case 20:
                                v = n.body, o = v.code || v.Code || o, i = D(D({}, v), {
                                    name: "" + o,
                                    message: v.message || v.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), h.label = 21;
                            case 21:
                                return g = i.message || i.Message || o, i.message = g, delete i.Message, [2, Promise.reject(Object.assign(new Error(g), i))]
                        }
                    }))
                }))
            }, xs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f, m, v;
                    return O(this, (function (g) {
                        switch (g.label) {
                            case 0:
                                return r = [D({}, e)], v = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(v.body = g.sent(), v)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"InvalidTagParameterException":
                                    case"com.amazonaws.ecr#InvalidTagParameterException":
                                        return [3, 4];
                                    case"KmsException":
                                    case"com.amazonaws.ecr#KmsException":
                                        return [3, 6];
                                    case"LimitExceededException":
                                    case"com.amazonaws.ecr#LimitExceededException":
                                        return [3, 8];
                                    case"RepositoryAlreadyExistsException":
                                    case"com.amazonaws.ecr#RepositoryAlreadyExistsException":
                                        return [3, 10];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 12];
                                    case"TooManyTagsException":
                                    case"com.amazonaws.ecr#TooManyTagsException":
                                        return [3, 14]
                                }
                                return [3, 16];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 4:
                                return s = [{}], [4, sc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 6:
                                return c = [{}], [4, cc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 8:
                                return u = [{}], [4, gc(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 10:
                                return l = [{}], [4, wc(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 12:
                                return d = [{}], [4, Ic(n, t)];
                            case 13:
                                return i = D.apply(void 0, [D.apply(void 0, d.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 14:
                                return p = [{}], [4, Cc(n, t)];
                            case 15:
                                return i = D.apply(void 0, [D.apply(void 0, p.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 16:
                                f = n.body, o = f.code || f.Code || o, i = D(D({}, f), {
                                    name: "" + o,
                                    message: f.message || f.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), g.label = 17;
                            case 17:
                                return m = i.message || i.Message || o, i.message = m, delete i.Message, [2, Promise.reject(Object.assign(new Error(m), i))]
                        }
                    }))
                }))
            }, Is = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"LifecyclePolicyNotFoundException":
                                    case"com.amazonaws.ecr#LifecyclePolicyNotFoundException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, fc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, Cs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RegistryPolicyNotFoundException":
                                    case"com.amazonaws.ecr#RegistryPolicyNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, hc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Ts = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f;
                    return O(this, (function (m) {
                        switch (m.label) {
                            case 0:
                                return r = [D({}, e)], f = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(f.body = m.sent(), f)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"KmsException":
                                    case"com.amazonaws.ecr#KmsException":
                                        return [3, 4];
                                    case"RepositoryNotEmptyException":
                                    case"com.amazonaws.ecr#RepositoryNotEmptyException":
                                        return [3, 6];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 8];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 4:
                                return s = [{}], [4, cc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 6:
                                return c = [{}], [4, bc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 8:
                                return u = [{}], [4, Ec(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 10:
                                return l = [{}], [4, Ic(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 12:
                                d = n.body, o = d.code || d.Code || o, i = D(D({}, d), {
                                    name: "" + o,
                                    message: d.message || d.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), m.label = 13;
                            case 13:
                                return p = i.message || i.Message || o, i.message = p, delete i.Message, [2, Promise.reject(Object.assign(new Error(p), i))]
                        }
                    }))
                }))
            }, Rs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"RepositoryPolicyNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryPolicyNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Sc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, Ns = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"ImageNotFoundException":
                                    case"com.amazonaws.ecr#ImageNotFoundException":
                                        return [3, 2];
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, nc(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, ac(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, Ps = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f;
                    return O(this, (function (m) {
                        switch (m.label) {
                            case 0:
                                return r = [D({}, e)], f = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(f.body = m.sent(), f)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"ImageNotFoundException":
                                    case"com.amazonaws.ecr#ImageNotFoundException":
                                        return [3, 2];
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ScanNotFoundException":
                                    case"com.amazonaws.ecr#ScanNotFoundException":
                                        return [3, 8];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 2:
                                return a = [{}], [4, nc(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 4:
                                return s = [{}], [4, ac(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 8:
                                return u = [{}], [4, xc(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 10:
                                return l = [{}], [4, Ic(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 12:
                                d = n.body, o = d.code || d.Code || o, i = D(D({}, d), {
                                    name: "" + o,
                                    message: d.message || d.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), m.label = 13;
                            case 13:
                                return p = i.message || i.Message || o, i.message = p, delete i.Message, [2, Promise.reject(Object.assign(new Error(p), i))]
                        }
                    }))
                }))
            }, Ls = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 4];
                                    case"ValidationException":
                                    case"com.amazonaws.ecr#ValidationException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ic(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Nc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, As = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, ks = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l;
                    return O(this, (function (d) {
                        switch (d.label) {
                            case 0:
                                return r = [D({}, e)], l = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(l.body = d.sent(), l)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 4]
                                }
                                return [3, 6];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([d.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 7];
                            case 4:
                                return s = [{}], [4, Ic(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([d.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 7];
                            case 6:
                                c = n.body, o = c.code || c.Code || o, i = D(D({}, c), {
                                    name: "" + o,
                                    message: c.message || c.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), d.label = 7;
                            case 7:
                                return u = i.message || i.Message || o, i.message = u, delete i.Message, [2, Promise.reject(Object.assign(new Error(u), i))]
                        }
                    }))
                }))
            }, zs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f;
                    return O(this, (function (m) {
                        switch (m.label) {
                            case 0:
                                return r = [D({}, e)], f = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(f.body = m.sent(), f)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"LayerInaccessibleException":
                                    case"com.amazonaws.ecr#LayerInaccessibleException":
                                        return [3, 4];
                                    case"LayersNotFoundException":
                                    case"com.amazonaws.ecr#LayersNotFoundException":
                                        return [3, 6];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 8];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 4:
                                return s = [{}], [4, lc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 6:
                                return c = [{}], [4, pc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 8:
                                return u = [{}], [4, Ec(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 10:
                                return l = [{}], [4, Ic(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 12:
                                d = n.body, o = d.code || d.Code || o, i = D(D({}, d), {
                                    name: "" + o,
                                    message: d.message || d.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), m.label = 13;
                            case 13:
                                return p = i.message || i.Message || o, i.message = p, delete i.Message, [2, Promise.reject(Object.assign(new Error(p), i))]
                        }
                    }))
                }))
            }, Ds = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"LifecyclePolicyNotFoundException":
                                    case"com.amazonaws.ecr#LifecyclePolicyNotFoundException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, fc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, qs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"LifecyclePolicyPreviewNotFoundException":
                                    case"com.amazonaws.ecr#LifecyclePolicyPreviewNotFoundException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, vc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, Ms = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RegistryPolicyNotFoundException":
                                    case"com.amazonaws.ecr#RegistryPolicyNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, hc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Os = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"RepositoryPolicyNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryPolicyNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Sc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, Fs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p;
                    return O(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return r = [D({}, e)], p = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(p.body = f.sent(), p)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"KmsException":
                                    case"com.amazonaws.ecr#KmsException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8]
                                }
                                return [3, 10];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 4:
                                return s = [{}], [4, cc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([f.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 11];
                            case 10:
                                l = n.body, o = l.code || l.Code || o, i = D(D({}, l), {
                                    name: "" + o,
                                    message: l.message || l.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), f.label = 11;
                            case 11:
                                return d = i.message || i.Message || o, i.message = d, delete i.Message, [2, Promise.reject(Object.assign(new Error(d), i))]
                        }
                    }))
                }))
            }, $s = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, js = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, _s = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f, m, v, g, y, h;
                    return O(this, (function (w) {
                        switch (w.label) {
                            case 0:
                                return r = [D({}, e)], h = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(h.body = w.sent(), h)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"ImageAlreadyExistsException":
                                    case"com.amazonaws.ecr#ImageAlreadyExistsException":
                                        return [3, 2];
                                    case"ImageDigestDoesNotMatchException":
                                    case"com.amazonaws.ecr#ImageDigestDoesNotMatchException":
                                        return [3, 4];
                                    case"ImageTagAlreadyExistsException":
                                    case"com.amazonaws.ecr#ImageTagAlreadyExistsException":
                                        return [3, 6];
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 8];
                                    case"KmsException":
                                    case"com.amazonaws.ecr#KmsException":
                                        return [3, 10];
                                    case"LayersNotFoundException":
                                    case"com.amazonaws.ecr#LayersNotFoundException":
                                        return [3, 12];
                                    case"LimitExceededException":
                                    case"com.amazonaws.ecr#LimitExceededException":
                                        return [3, 14];
                                    case"ReferencedImagesNotFoundException":
                                    case"com.amazonaws.ecr#ReferencedImagesNotFoundException":
                                        return [3, 16];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 18];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 20]
                                }
                                return [3, 22];
                            case 2:
                                return a = [{}], [4, ec(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 4:
                                return s = [{}], [4, tc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 6:
                                return c = [{}], [4, rc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 8:
                                return u = [{}], [4, ac(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 10:
                                return l = [{}], [4, cc(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 12:
                                return d = [{}], [4, pc(n, t)];
                            case 13:
                                return i = D.apply(void 0, [D.apply(void 0, d.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 14:
                                return p = [{}], [4, gc(n, t)];
                            case 15:
                                return i = D.apply(void 0, [D.apply(void 0, p.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 16:
                                return f = [{}], [4, yc(n, t)];
                            case 17:
                                return i = D.apply(void 0, [D.apply(void 0, f.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 18:
                                return m = [{}], [4, Ec(n, t)];
                            case 19:
                                return i = D.apply(void 0, [D.apply(void 0, m.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 20:
                                return v = [{}], [4, Ic(n, t)];
                            case 21:
                                return i = D.apply(void 0, [D.apply(void 0, v.concat([w.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 23];
                            case 22:
                                g = n.body, o = g.code || g.Code || o, i = D(D({}, g), {
                                    name: "" + o,
                                    message: g.message || g.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), w.label = 23;
                            case 23:
                                return y = i.message || i.Message || o, i.message = y, delete i.Message, [2, Promise.reject(Object.assign(new Error(y), i))]
                        }
                    }))
                }))
            }, Us = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Vs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Bs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Hs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l;
                    return O(this, (function (d) {
                        switch (d.label) {
                            case 0:
                                return r = [D({}, e)], l = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(l.body = d.sent(), l)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 4]
                                }
                                return [3, 6];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([d.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 7];
                            case 4:
                                return s = [{}], [4, Ic(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([d.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 7];
                            case 6:
                                c = n.body, o = c.code || c.Code || o, i = D(D({}, c), {
                                    name: "" + o,
                                    message: c.message || c.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), d.label = 7;
                            case 7:
                                return u = i.message || i.Message || o, i.message = u, delete i.Message, [2, Promise.reject(Object.assign(new Error(u), i))]
                        }
                    }))
                }))
            }, Gs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 4];
                                    case"ValidationException":
                                    case"com.amazonaws.ecr#ValidationException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ic(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Nc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Ks = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d;
                    return O(this, (function (p) {
                        switch (p.label) {
                            case 0:
                                return r = [D({}, e)], d = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(d.body = p.sent(), d)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 4];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 6]
                                }
                                return [3, 8];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 4:
                                return s = [{}], [4, Ec(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 6:
                                return c = [{}], [4, Ic(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([p.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 9];
                            case 8:
                                u = n.body, o = u.code || u.Code || o, i = D(D({}, u), {
                                    name: "" + o,
                                    message: u.message || u.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), p.label = 9;
                            case 9:
                                return l = i.message || i.Message || o, i.message = l, delete i.Message, [2, Promise.reject(Object.assign(new Error(l), i))]
                        }
                    }))
                }))
            }, Ws = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f, m;
                    return O(this, (function (v) {
                        switch (v.label) {
                            case 0:
                                return r = [D({}, e)], m = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(m.body = v.sent(), m)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"ImageNotFoundException":
                                    case"com.amazonaws.ecr#ImageNotFoundException":
                                        return [3, 2];
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 4];
                                    case"LimitExceededException":
                                    case"com.amazonaws.ecr#LimitExceededException":
                                        return [3, 6];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 8];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 10];
                                    case"UnsupportedImageTypeException":
                                    case"com.amazonaws.ecr#UnsupportedImageTypeException":
                                        return [3, 12]
                                }
                                return [3, 14];
                            case 2:
                                return a = [{}], [4, nc(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([v.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 15];
                            case 4:
                                return s = [{}], [4, ac(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([v.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 15];
                            case 6:
                                return c = [{}], [4, gc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([v.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 15];
                            case 8:
                                return u = [{}], [4, Ec(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([v.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 15];
                            case 10:
                                return l = [{}], [4, Ic(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([v.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 15];
                            case 12:
                                return d = [{}], [4, Tc(n, t)];
                            case 13:
                                return i = D.apply(void 0, [D.apply(void 0, d.concat([v.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 15];
                            case 14:
                                p = n.body, o = p.code || p.Code || o, i = D(D({}, p), {
                                    name: "" + o,
                                    message: p.message || p.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), v.label = 15;
                            case 15:
                                return f = i.message || i.Message || o, i.message = f, delete i.Message, [2, Promise.reject(Object.assign(new Error(f), i))]
                        }
                    }))
                }))
            }, Js = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f;
                    return O(this, (function (m) {
                        switch (m.label) {
                            case 0:
                                return r = [D({}, e)], f = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(f.body = m.sent(), f)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"LifecyclePolicyNotFoundException":
                                    case"com.amazonaws.ecr#LifecyclePolicyNotFoundException":
                                        return [3, 4];
                                    case"LifecyclePolicyPreviewInProgressException":
                                    case"com.amazonaws.ecr#LifecyclePolicyPreviewInProgressException":
                                        return [3, 6];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 8];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 4:
                                return s = [{}], [4, fc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 6:
                                return c = [{}], [4, mc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 8:
                                return u = [{}], [4, Ec(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 10:
                                return l = [{}], [4, Ic(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 12:
                                d = n.body, o = d.code || d.Code || o, i = D(D({}, d), {
                                    name: "" + o,
                                    message: d.message || d.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), m.label = 13;
                            case 13:
                                return p = i.message || i.Message || o, i.message = p, delete i.Message, [2, Promise.reject(Object.assign(new Error(p), i))]
                        }
                    }))
                }))
            }, Xs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f;
                    return O(this, (function (m) {
                        switch (m.label) {
                            case 0:
                                return r = [D({}, e)], f = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(f.body = m.sent(), f)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"InvalidTagParameterException":
                                    case"com.amazonaws.ecr#InvalidTagParameterException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8];
                                    case"TooManyTagsException":
                                    case"com.amazonaws.ecr#TooManyTagsException":
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 4:
                                return s = [{}], [4, sc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 10:
                                return l = [{}], [4, Cc(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 12:
                                d = n.body, o = d.code || d.Code || o, i = D(D({}, d), {
                                    name: "" + o,
                                    message: d.message || d.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), m.label = 13;
                            case 13:
                                return p = i.message || i.Message || o, i.message = p, delete i.Message, [2, Promise.reject(Object.assign(new Error(p), i))]
                        }
                    }))
                }))
            }, Ys = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f;
                    return O(this, (function (m) {
                        switch (m.label) {
                            case 0:
                                return r = [D({}, e)], f = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(f.body = m.sent(), f)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 2];
                                    case"InvalidTagParameterException":
                                    case"com.amazonaws.ecr#InvalidTagParameterException":
                                        return [3, 4];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 6];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 8];
                                    case"TooManyTagsException":
                                    case"com.amazonaws.ecr#TooManyTagsException":
                                        return [3, 10]
                                }
                                return [3, 12];
                            case 2:
                                return a = [{}], [4, ac(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 4:
                                return s = [{}], [4, sc(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 6:
                                return c = [{}], [4, Ec(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 8:
                                return u = [{}], [4, Ic(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 10:
                                return l = [{}], [4, Cc(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([m.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 13];
                            case 12:
                                d = n.body, o = d.code || d.Code || o, i = D(D({}, d), {
                                    name: "" + o,
                                    message: d.message || d.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), m.label = 13;
                            case 13:
                                return p = i.message || i.Message || o, i.message = p, delete i.Message, [2, Promise.reject(Object.assign(new Error(p), i))]
                        }
                    }))
                }))
            }, Zs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i, o, a, s, c, u, l, d, p, f, m, v;
                    return O(this, (function (g) {
                        switch (g.label) {
                            case 0:
                                return r = [D({}, e)], v = {}, [4, Yu(e.body, t)];
                            case 1:
                                switch (n = D.apply(void 0, r.concat([(v.body = g.sent(), v)])), o = "UnknownError", o = Zu(e, n.body)) {
                                    case"InvalidLayerPartException":
                                    case"com.amazonaws.ecr#InvalidLayerPartException":
                                        return [3, 2];
                                    case"InvalidParameterException":
                                    case"com.amazonaws.ecr#InvalidParameterException":
                                        return [3, 4];
                                    case"KmsException":
                                    case"com.amazonaws.ecr#KmsException":
                                        return [3, 6];
                                    case"LimitExceededException":
                                    case"com.amazonaws.ecr#LimitExceededException":
                                        return [3, 8];
                                    case"RepositoryNotFoundException":
                                    case"com.amazonaws.ecr#RepositoryNotFoundException":
                                        return [3, 10];
                                    case"ServerException":
                                    case"com.amazonaws.ecr#ServerException":
                                        return [3, 12];
                                    case"UploadNotFoundException":
                                    case"com.amazonaws.ecr#UploadNotFoundException":
                                        return [3, 14]
                                }
                                return [3, 16];
                            case 2:
                                return a = [{}], [4, oc(n, t)];
                            case 3:
                                return i = D.apply(void 0, [D.apply(void 0, a.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 4:
                                return s = [{}], [4, ac(n, t)];
                            case 5:
                                return i = D.apply(void 0, [D.apply(void 0, s.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 6:
                                return c = [{}], [4, cc(n, t)];
                            case 7:
                                return i = D.apply(void 0, [D.apply(void 0, c.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 8:
                                return u = [{}], [4, gc(n, t)];
                            case 9:
                                return i = D.apply(void 0, [D.apply(void 0, u.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 10:
                                return l = [{}], [4, Ec(n, t)];
                            case 11:
                                return i = D.apply(void 0, [D.apply(void 0, l.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 12:
                                return d = [{}], [4, Ic(n, t)];
                            case 13:
                                return i = D.apply(void 0, [D.apply(void 0, d.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 14:
                                return p = [{}], [4, Rc(n, t)];
                            case 15:
                                return i = D.apply(void 0, [D.apply(void 0, p.concat([g.sent()])), {
                                    name: o,
                                    $metadata: Ju(e)
                                }]), [3, 17];
                            case 16:
                                f = n.body, o = f.code || f.Code || o, i = D(D({}, f), {
                                    name: "" + o,
                                    message: f.message || f.Message || o,
                                    $fault: "client",
                                    $metadata: Ju(e)
                                }), g.label = 17;
                            case 17:
                                return m = i.message || i.Message || o, i.message = m, delete i.Message, [2, Promise.reject(Object.assign(new Error(m), i))]
                        }
                    }))
                }))
            }, Qs = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Wc(n, t), [2, D({
                            name: "EmptyUploadException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, ec = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Zc(n, t), [2, D({
                            name: "ImageAlreadyExistsException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, tc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = eu(n, t), [2, D({
                            name: "ImageDigestDoesNotMatchException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, nc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = ou(n, t), [2, D({
                            name: "ImageNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, rc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = du(n, t), [2, D({
                            name: "ImageTagAlreadyExistsException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, ic = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = fu(n, t), [2, D({
                            name: "InvalidLayerException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, oc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = mu(n, t), [2, D({
                            name: "InvalidLayerPartException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, ac = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = vu(n, t), [2, D({
                            name: "InvalidParameterException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, sc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = gu(n, t), [2, D({
                            name: "InvalidTagParameterException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, cc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = yu(n, t), [2, D({
                            name: "KmsException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, uc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = hu(n, t), [2, D({
                            name: "LayerAlreadyExistsException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, lc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = bu(n, t), [2, D({
                            name: "LayerInaccessibleException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, dc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Su(n, t), [2, D({
                            name: "LayerPartTooSmallException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, pc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = xu(n, t), [2, D({
                            name: "LayersNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, fc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Iu(n, t), [2, D({
                            name: "LifecyclePolicyNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, mc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Cu(n, t), [2, D({
                            name: "LifecyclePolicyPreviewInProgressException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, vc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Tu(n, t), [2, D({
                            name: "LifecyclePolicyPreviewNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, gc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Lu(n, t), [2, D({
                            name: "LimitExceededException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, yc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Au(n, t), [2, D({
                            name: "ReferencedImagesNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, hc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = ku(n, t), [2, D({
                            name: "RegistryPolicyNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, wc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Ou(n, t), [2, D({
                            name: "RepositoryAlreadyExistsException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, bc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = $u(n, t), [2, D({
                            name: "RepositoryNotEmptyException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Ec = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = ju(n, t), [2, D({
                            name: "RepositoryNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Sc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = _u(n, t), [2, D({
                            name: "RepositoryPolicyNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, xc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Uu(n, t), [2, D({
                            name: "ScanNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Ic = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Vu(n, t), [2, D({
                            name: "ServerException",
                            $fault: "server",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Cc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Hu(n, t), [2, D({
                            name: "TooManyTagsException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Tc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Gu(n, t), [2, D({
                            name: "UnsupportedImageTypeException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Rc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Ku(n, t), [2, D({
                            name: "UploadNotFoundException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Nc = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r;
                    return O(this, (function (i) {
                        return n = e.body, r = Wu(n, t), [2, D({
                            name: "ValidationException",
                            $fault: "client",
                            $metadata: Ju(e)
                        }, r)]
                    }))
                }))
            }, Pc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, Lc = function (e, t) {
                return D({}, void 0 !== e.tagStatus && null !== e.tagStatus && {tagStatus: e.tagStatus})
            }, Ac = function (e, t) {
                return D(D({}, void 0 !== e.encryptionType && null !== e.encryptionType && {encryptionType: e.encryptionType}), void 0 !== e.kmsKey && null !== e.kmsKey && {kmsKey: e.kmsKey})
            }, kc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, zc = function (e, t) {
                return D(D({}, void 0 !== e.imageDigest && null !== e.imageDigest && {imageDigest: e.imageDigest}), void 0 !== e.imageTag && null !== e.imageTag && {imageTag: e.imageTag})
            }, Dc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : zc(e, t)
                }))
            }, qc = function (e, t) {
                return D({}, void 0 !== e.scanOnPush && null !== e.scanOnPush && {scanOnPush: e.scanOnPush})
            }, Mc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, Oc = function (e, t) {
                return D({}, void 0 !== e.tagStatus && null !== e.tagStatus && {tagStatus: e.tagStatus})
            }, Fc = function (e, t) {
                return D({}, void 0 !== e.tagStatus && null !== e.tagStatus && {tagStatus: e.tagStatus})
            }, $c = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, jc = function (e, t) {
                return D({}, void 0 !== e.rules && null !== e.rules && {rules: Uc(e.rules, t)})
            }, _c = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return D(D({}, void 0 !== e.region && null !== e.region && {region: e.region}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId})
                    }(e)
                }))
            }, Uc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return D({}, void 0 !== e.destinations && null !== e.destinations && {destinations: _c(e.destinations)})
                    }(e)
                }))
            }, Vc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, Bc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, Hc = function (e, t) {
                return e.filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return D(D({}, void 0 !== e.Key && null !== e.Key && {Key: e.Key}), void 0 !== e.Value && null !== e.Value && {Value: e.Value})
                    }(e)
                }))
            }, Gc = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            key: void 0 !== e.key && null !== e.key ? e.key : void 0,
                            value: void 0 !== e.value && null !== e.value ? e.value : void 0
                        }
                    }(e)
                }))
            }, Kc = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            authorizationToken: void 0 !== e.authorizationToken && null !== e.authorizationToken ? e.authorizationToken : void 0,
                            expiresAt: void 0 !== e.expiresAt && null !== e.expiresAt ? new Date(Math.round(1e3 * e.expiresAt)) : void 0,
                            proxyEndpoint: void 0 !== e.proxyEndpoint && null !== e.proxyEndpoint ? e.proxyEndpoint : void 0
                        }
                    }(e)
                }))
            }, Wc = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Jc = function (e, t) {
                return {
                    encryptionType: void 0 !== e.encryptionType && null !== e.encryptionType ? e.encryptionType : void 0,
                    kmsKey: void 0 !== e.kmsKey && null !== e.kmsKey ? e.kmsKey : void 0
                }
            }, Xc = function (e, t) {
                return Object.entries(e).reduce((function (e, t) {
                    var n, r = $(t, 2), i = r[0], o = r[1];
                    return null === o ? e : D(D({}, e), ((n = {})[i] = o, n))
                }), {})
            }, Yc = function (e, t) {
                return {
                    imageId: void 0 !== e.imageId && null !== e.imageId ? nu(e.imageId, t) : void 0,
                    imageManifest: void 0 !== e.imageManifest && null !== e.imageManifest ? e.imageManifest : void 0,
                    imageManifestMediaType: void 0 !== e.imageManifestMediaType && null !== e.imageManifestMediaType ? e.imageManifestMediaType : void 0,
                    registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                    repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                }
            }, Zc = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Qc = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            artifactMediaType: void 0 !== e.artifactMediaType && null !== e.artifactMediaType ? e.artifactMediaType : void 0,
                            imageDigest: void 0 !== e.imageDigest && null !== e.imageDigest ? e.imageDigest : void 0,
                            imageManifestMediaType: void 0 !== e.imageManifestMediaType && null !== e.imageManifestMediaType ? e.imageManifestMediaType : void 0,
                            imagePushedAt: void 0 !== e.imagePushedAt && null !== e.imagePushedAt ? new Date(Math.round(1e3 * e.imagePushedAt)) : void 0,
                            imageScanFindingsSummary: void 0 !== e.imageScanFindingsSummary && null !== e.imageScanFindingsSummary ? cu(e.imageScanFindingsSummary, t) : void 0,
                            imageScanStatus: void 0 !== e.imageScanStatus && null !== e.imageScanStatus ? lu(e.imageScanStatus, t) : void 0,
                            imageSizeInBytes: void 0 !== e.imageSizeInBytes && null !== e.imageSizeInBytes ? e.imageSizeInBytes : void 0,
                            imageTags: void 0 !== e.imageTags && null !== e.imageTags ? pu(e.imageTags, t) : void 0,
                            registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                            repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                        }
                    }(e, t)
                }))
            }, eu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, tu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            failureCode: void 0 !== e.failureCode && null !== e.failureCode ? e.failureCode : void 0,
                            failureReason: void 0 !== e.failureReason && null !== e.failureReason ? e.failureReason : void 0,
                            imageId: void 0 !== e.imageId && null !== e.imageId ? nu(e.imageId, t) : void 0
                        }
                    }(e, t)
                }))
            }, nu = function (e, t) {
                return {
                    imageDigest: void 0 !== e.imageDigest && null !== e.imageDigest ? e.imageDigest : void 0,
                    imageTag: void 0 !== e.imageTag && null !== e.imageTag ? e.imageTag : void 0
                }
            }, ru = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : nu(e, t)
                }))
            }, iu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : Yc(e, t)
                }))
            }, ou = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, au = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            attributes: void 0 !== e.attributes && null !== e.attributes ? Gc(e.attributes) : void 0,
                            description: void 0 !== e.description && null !== e.description ? e.description : void 0,
                            name: void 0 !== e.name && null !== e.name ? e.name : void 0,
                            severity: void 0 !== e.severity && null !== e.severity ? e.severity : void 0,
                            uri: void 0 !== e.uri && null !== e.uri ? e.uri : void 0
                        }
                    }(e)
                }))
            }, su = function (e, t) {
                return {
                    findingSeverityCounts: void 0 !== e.findingSeverityCounts && null !== e.findingSeverityCounts ? Xc(e.findingSeverityCounts) : void 0,
                    findings: void 0 !== e.findings && null !== e.findings ? au(e.findings) : void 0,
                    imageScanCompletedAt: void 0 !== e.imageScanCompletedAt && null !== e.imageScanCompletedAt ? new Date(Math.round(1e3 * e.imageScanCompletedAt)) : void 0,
                    vulnerabilitySourceUpdatedAt: void 0 !== e.vulnerabilitySourceUpdatedAt && null !== e.vulnerabilitySourceUpdatedAt ? new Date(Math.round(1e3 * e.vulnerabilitySourceUpdatedAt)) : void 0
                }
            }, cu = function (e, t) {
                return {
                    findingSeverityCounts: void 0 !== e.findingSeverityCounts && null !== e.findingSeverityCounts ? Xc(e.findingSeverityCounts) : void 0,
                    imageScanCompletedAt: void 0 !== e.imageScanCompletedAt && null !== e.imageScanCompletedAt ? new Date(Math.round(1e3 * e.imageScanCompletedAt)) : void 0,
                    vulnerabilitySourceUpdatedAt: void 0 !== e.vulnerabilitySourceUpdatedAt && null !== e.vulnerabilitySourceUpdatedAt ? new Date(Math.round(1e3 * e.vulnerabilitySourceUpdatedAt)) : void 0
                }
            }, uu = function (e, t) {
                return {scanOnPush: void 0 !== e.scanOnPush && null !== e.scanOnPush ? e.scanOnPush : void 0}
            }, lu = function (e, t) {
                return {
                    description: void 0 !== e.description && null !== e.description ? e.description : void 0,
                    status: void 0 !== e.status && null !== e.status ? e.status : void 0
                }
            }, du = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, pu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : e
                }))
            }, fu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, mu = function (e, t) {
                return {
                    lastValidByteReceived: void 0 !== e.lastValidByteReceived && null !== e.lastValidByteReceived ? e.lastValidByteReceived : void 0,
                    message: void 0 !== e.message && null !== e.message ? e.message : void 0,
                    registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                    repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0,
                    uploadId: void 0 !== e.uploadId && null !== e.uploadId ? e.uploadId : void 0
                }
            }, vu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, gu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, yu = function (e, t) {
                return {
                    kmsError: void 0 !== e.kmsError && null !== e.kmsError ? e.kmsError : void 0,
                    message: void 0 !== e.message && null !== e.message ? e.message : void 0
                }
            }, hu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, wu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            failureCode: void 0 !== e.failureCode && null !== e.failureCode ? e.failureCode : void 0,
                            failureReason: void 0 !== e.failureReason && null !== e.failureReason ? e.failureReason : void 0,
                            layerDigest: void 0 !== e.layerDigest && null !== e.layerDigest ? e.layerDigest : void 0
                        }
                    }(e)
                }))
            }, bu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Eu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            layerAvailability: void 0 !== e.layerAvailability && null !== e.layerAvailability ? e.layerAvailability : void 0,
                            layerDigest: void 0 !== e.layerDigest && null !== e.layerDigest ? e.layerDigest : void 0,
                            layerSize: void 0 !== e.layerSize && null !== e.layerSize ? e.layerSize : void 0,
                            mediaType: void 0 !== e.mediaType && null !== e.mediaType ? e.mediaType : void 0
                        }
                    }(e)
                }))
            }, Su = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, xu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Iu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Cu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Tu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Ru = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            action: void 0 !== e.action && null !== e.action ? Pu(e.action, t) : void 0,
                            appliedRulePriority: void 0 !== e.appliedRulePriority && null !== e.appliedRulePriority ? e.appliedRulePriority : void 0,
                            imageDigest: void 0 !== e.imageDigest && null !== e.imageDigest ? e.imageDigest : void 0,
                            imagePushedAt: void 0 !== e.imagePushedAt && null !== e.imagePushedAt ? new Date(Math.round(1e3 * e.imagePushedAt)) : void 0,
                            imageTags: void 0 !== e.imageTags && null !== e.imageTags ? pu(e.imageTags, t) : void 0
                        }
                    }(e, t)
                }))
            }, Nu = function (e, t) {
                return {expiringImageTotalCount: void 0 !== e.expiringImageTotalCount && null !== e.expiringImageTotalCount ? e.expiringImageTotalCount : void 0}
            }, Pu = function (e, t) {
                return {type: void 0 !== e.type && null !== e.type ? e.type : void 0}
            }, Lu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Au = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, ku = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, zu = function (e, t) {
                return {rules: void 0 !== e.rules && null !== e.rules ? qu(e.rules, t) : void 0}
            }, Du = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            region: void 0 !== e.region && null !== e.region ? e.region : void 0,
                            registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0
                        }
                    }(e)
                }))
            }, qu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {destinations: void 0 !== e.destinations && null !== e.destinations ? Du(e.destinations) : void 0}
                    }(e)
                }))
            }, Mu = function (e, t) {
                return {
                    createdAt: void 0 !== e.createdAt && null !== e.createdAt ? new Date(Math.round(1e3 * e.createdAt)) : void 0,
                    encryptionConfiguration: void 0 !== e.encryptionConfiguration && null !== e.encryptionConfiguration ? Jc(e.encryptionConfiguration) : void 0,
                    imageScanningConfiguration: void 0 !== e.imageScanningConfiguration && null !== e.imageScanningConfiguration ? uu(e.imageScanningConfiguration) : void 0,
                    imageTagMutability: void 0 !== e.imageTagMutability && null !== e.imageTagMutability ? e.imageTagMutability : void 0,
                    registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                    repositoryArn: void 0 !== e.repositoryArn && null !== e.repositoryArn ? e.repositoryArn : void 0,
                    repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0,
                    repositoryUri: void 0 !== e.repositoryUri && null !== e.repositoryUri ? e.repositoryUri : void 0
                }
            }, Ou = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Fu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : Mu(e, t)
                }))
            }, $u = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, ju = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, _u = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Uu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Vu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Bu = function (e, t) {
                return (e || []).filter((function (e) {
                    return null != e
                })).map((function (e) {
                    return null === e ? null : function (e, t) {
                        return {
                            Key: void 0 !== e.Key && null !== e.Key ? e.Key : void 0,
                            Value: void 0 !== e.Value && null !== e.Value ? e.Value : void 0
                        }
                    }(e)
                }))
            }, Hu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Gu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Ku = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Wu = function (e, t) {
                return {message: void 0 !== e.message && null !== e.message ? e.message : void 0}
            }, Ju = function (e) {
                var t;
                return {
                    httpStatusCode: e.statusCode,
                    requestId: null !== (t = e.headers["x-amzn-requestid"]) && void 0 !== t ? t : e.headers["x-amzn-request-id"],
                    extendedRequestId: e.headers["x-amz-id-2"],
                    cfId: e.headers["x-amz-cf-id"]
                }
            }, Xu = function (e, t, n, r, i) {
                return M(void 0, void 0, void 0, (function () {
                    var o, a, s, c, u, l;
                    return O(this, (function (d) {
                        switch (d.label) {
                            case 0:
                                return [4, e.endpoint()];
                            case 1:
                                return o = d.sent(), a = o.hostname, s = o.protocol, c = void 0 === s ? "https" : s, u = o.port, l = {
                                    protocol: c,
                                    hostname: a,
                                    port: u,
                                    method: "POST",
                                    path: n,
                                    headers: t
                                }, void 0 !== r && (l.hostname = r), void 0 !== i && (l.body = i), [2, new B(l)]
                        }
                    }))
                }))
            }, Yu = function (e, t) {
                return function (e, t) {
                    return function (e, t) {
                        return void 0 === e && (e = new Uint8Array), e instanceof Uint8Array ? Promise.resolve(e) : t.streamCollector(e) || Promise.resolve(new Uint8Array)
                    }(e, t).then((function (e) {
                        return t.utf8Encoder(e)
                    }))
                }(e, t).then((function (e) {
                    return e.length ? JSON.parse(e) : {}
                }))
            }, Zu = function (e, t) {
                var n, r = function (e) {
                    var t = e;
                    return t.indexOf(":") >= 0 && (t = t.split(":")[0]), t.indexOf("#") >= 0 && (t = t.split("#")[1]), t
                }, i = (n = e.headers, "x-amzn-errortype", Object.keys(n).find((function (e) {
                    return e.toLowerCase() === "x-amzn-errortype".toLowerCase()
                })));
                return void 0 !== i ? r(e.headers[i]) : void 0 !== t.code ? r(t.code) : void 0 !== t.__type ? r(t.__type) : ""
            }, Qu = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "BatchCheckLayerAvailabilityCommand",
                        inputFilterSensitiveLog: mi.filterSensitiveLog,
                        outputFilterSensitiveLog: wi.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.BatchCheckLayerAvailability"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.layerDigests && null !== e.layerDigests && {layerDigests: Pc(e.layerDigests, t)}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, ws(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                failures: void 0 !== e.failures && null !== e.failures ? wu(e.failures, t) : void 0,
                                                layers: void 0 !== e.layers && null !== e.layers ? Eu(e.layers, t) : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), el = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "BatchDeleteImageCommand",
                        inputFilterSensitiveLog: Ii.filterSensitiveLog,
                        outputFilterSensitiveLog: Ri.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.BatchDeleteImage"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.imageIds && null !== e.imageIds && {imageIds: Dc(e.imageIds, t)}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, bs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                failures: void 0 !== e.failures && null !== e.failures ? tu(e.failures, t) : void 0,
                                                imageIds: void 0 !== e.imageIds && null !== e.imageIds ? ru(e.imageIds, t) : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), tl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "BatchGetImageCommand",
                        inputFilterSensitiveLog: Ni.filterSensitiveLog,
                        outputFilterSensitiveLog: Li.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.BatchGetImage"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D({}, void 0 !== e.acceptedMediaTypes && null !== e.acceptedMediaTypes && {acceptedMediaTypes: $c(e.acceptedMediaTypes, t)}), void 0 !== e.imageIds && null !== e.imageIds && {imageIds: Dc(e.imageIds, t)}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Es(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                failures: void 0 !== e.failures && null !== e.failures ? tu(e.failures, t) : void 0,
                                                images: void 0 !== e.images && null !== e.images ? iu(e.images, t) : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), nl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "CompleteLayerUploadCommand",
                        inputFilterSensitiveLog: Ai.filterSensitiveLog,
                        outputFilterSensitiveLog: ki.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.CompleteLayerUpload"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D({}, void 0 !== e.layerDigests && null !== e.layerDigests && {layerDigests: Mc(e.layerDigests, t)}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName}), void 0 !== e.uploadId && null !== e.uploadId && {uploadId: e.uploadId})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ss(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                layerDigest: void 0 !== e.layerDigest && null !== e.layerDigest ? e.layerDigest : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0,
                                                uploadId: void 0 !== e.uploadId && null !== e.uploadId ? e.uploadId : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), rl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "CreateRepositoryCommand",
                        inputFilterSensitiveLog: Bi.filterSensitiveLog,
                        outputFilterSensitiveLog: Gi.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.CreateRepository"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D({}, void 0 !== e.encryptionConfiguration && null !== e.encryptionConfiguration && {encryptionConfiguration: Ac(e.encryptionConfiguration, t)}), void 0 !== e.imageScanningConfiguration && null !== e.imageScanningConfiguration && {imageScanningConfiguration: qc(e.imageScanningConfiguration, t)}), void 0 !== e.imageTagMutability && null !== e.imageTagMutability && {imageTagMutability: e.imageTagMutability}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName}), void 0 !== e.tags && null !== e.tags && {tags: Hc(e.tags, t)})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, xs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {repository: void 0 !== e.repository && null !== e.repository ? Mu(e.repository, t) : void 0}
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), il = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DeleteLifecyclePolicyCommand",
                        inputFilterSensitiveLog: Yi.filterSensitiveLog,
                        outputFilterSensitiveLog: Zi.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteLifecyclePolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Is(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                lastEvaluatedAt: void 0 !== e.lastEvaluatedAt && null !== e.lastEvaluatedAt ? new Date(Math.round(1e3 * e.lastEvaluatedAt)) : void 0,
                                                lifecyclePolicyText: void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText ? e.lifecyclePolicyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), ol = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DeleteRegistryPolicyCommand",
                        inputFilterSensitiveLog: eo.filterSensitiveLog,
                        outputFilterSensitiveLog: to.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var e, n;
                            return O(this, (function (r) {
                                return e = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteRegistryPolicy"
                                }, n = JSON.stringify({}), [2, Xu(t, e, "/", void 0, n)]
                            }))
                        }))
                    }(0, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Cs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                policyText: void 0 !== e.policyText && null !== e.policyText ? e.policyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), al = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DeleteRepositoryCommand",
                        inputFilterSensitiveLog: ro.filterSensitiveLog,
                        outputFilterSensitiveLog: io.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteRepository"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.force && null !== e.force && {force: e.force}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ts(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {repository: void 0 !== e.repository && null !== e.repository ? Mu(e.repository, t) : void 0}
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), sl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DeleteRepositoryPolicyCommand",
                        inputFilterSensitiveLog: ao.filterSensitiveLog,
                        outputFilterSensitiveLog: so.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DeleteRepositoryPolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Rs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                policyText: void 0 !== e.policyText && null !== e.policyText ? e.policyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), cl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DescribeImageScanFindingsCommand",
                        inputFilterSensitiveLog: bo.filterSensitiveLog,
                        outputFilterSensitiveLog: Io.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeImageScanFindings"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D({}, void 0 !== e.imageId && null !== e.imageId && {imageId: zc(e.imageId, t)}), void 0 !== e.maxResults && null !== e.maxResults && {maxResults: e.maxResults}), void 0 !== e.nextToken && null !== e.nextToken && {nextToken: e.nextToken}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ps(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                imageId: void 0 !== e.imageId && null !== e.imageId ? nu(e.imageId, t) : void 0,
                                                imageScanFindings: void 0 !== e.imageScanFindings && null !== e.imageScanFindings ? su(e.imageScanFindings, t) : void 0,
                                                imageScanStatus: void 0 !== e.imageScanStatus && null !== e.imageScanStatus ? lu(e.imageScanStatus, t) : void 0,
                                                nextToken: void 0 !== e.nextToken && null !== e.nextToken ? e.nextToken : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), ul = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DescribeImagesCommand",
                        inputFilterSensitiveLog: po.filterSensitiveLog,
                        outputFilterSensitiveLog: ho.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeImages"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D(D({}, void 0 !== e.filter && null !== e.filter && {filter: Lc(e.filter)}), void 0 !== e.imageIds && null !== e.imageIds && {imageIds: Dc(e.imageIds, t)}), void 0 !== e.maxResults && null !== e.maxResults && {maxResults: e.maxResults}), void 0 !== e.nextToken && null !== e.nextToken && {nextToken: e.nextToken}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ns(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                imageDetails: void 0 !== e.imageDetails && null !== e.imageDetails ? Qc(e.imageDetails, t) : void 0,
                                                nextToken: void 0 !== e.nextToken && null !== e.nextToken ? e.nextToken : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), ll = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DescribeRegistryCommand",
                        inputFilterSensitiveLog: To.filterSensitiveLog,
                        outputFilterSensitiveLog: Lo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var e, n;
                            return O(this, (function (r) {
                                return e = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeRegistry"
                                }, n = JSON.stringify({}), [2, Xu(t, e, "/", void 0, n)]
                            }))
                        }))
                    }(0, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ls(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                replicationConfiguration: void 0 !== e.replicationConfiguration && null !== e.replicationConfiguration ? zu(e.replicationConfiguration, t) : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), dl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "DescribeRepositoriesCommand",
                        inputFilterSensitiveLog: ko.filterSensitiveLog,
                        outputFilterSensitiveLog: zo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.DescribeRepositories"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D({}, void 0 !== e.maxResults && null !== e.maxResults && {maxResults: e.maxResults}), void 0 !== e.nextToken && null !== e.nextToken && {nextToken: e.nextToken}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryNames && null !== e.repositoryNames && {repositoryNames: Vc(e.repositoryNames, t)})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, As(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                nextToken: void 0 !== e.nextToken && null !== e.nextToken ? e.nextToken : void 0,
                                                repositories: void 0 !== e.repositories && null !== e.repositories ? Fu(e.repositories, t) : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), pl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "GetAuthorizationTokenCommand",
                        inputFilterSensitiveLog: Do.filterSensitiveLog,
                        outputFilterSensitiveLog: Mo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetAuthorizationToken"
                                }, r = JSON.stringify(function (e, t) {
                                    return D({}, void 0 !== e.registryIds && null !== e.registryIds && {registryIds: kc(e.registryIds)})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, ks(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {authorizationData: void 0 !== e.authorizationData && null !== e.authorizationData ? Kc(e.authorizationData) : void 0}
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), fl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "GetDownloadUrlForLayerCommand",
                        inputFilterSensitiveLog: Oo.filterSensitiveLog,
                        outputFilterSensitiveLog: Fo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetDownloadUrlForLayer"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.layerDigest && null !== e.layerDigest && {layerDigest: e.layerDigest}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, zs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                downloadUrl: void 0 !== e.downloadUrl && null !== e.downloadUrl ? e.downloadUrl : void 0,
                                                layerDigest: void 0 !== e.layerDigest && null !== e.layerDigest ? e.layerDigest : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), ml = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "GetLifecyclePolicyCommand",
                        inputFilterSensitiveLog: _o.filterSensitiveLog,
                        outputFilterSensitiveLog: Uo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetLifecyclePolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ds(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                lastEvaluatedAt: void 0 !== e.lastEvaluatedAt && null !== e.lastEvaluatedAt ? new Date(Math.round(1e3 * e.lastEvaluatedAt)) : void 0,
                                                lifecyclePolicyText: void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText ? e.lifecyclePolicyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), vl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "GetLifecyclePolicyPreviewCommand",
                        inputFilterSensitiveLog: Bo.filterSensitiveLog,
                        outputFilterSensitiveLog: Xo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetLifecyclePolicyPreview"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D(D({}, void 0 !== e.filter && null !== e.filter && {filter: Oc(e.filter, t)}), void 0 !== e.imageIds && null !== e.imageIds && {imageIds: Dc(e.imageIds, t)}), void 0 !== e.maxResults && null !== e.maxResults && {maxResults: e.maxResults}), void 0 !== e.nextToken && null !== e.nextToken && {nextToken: e.nextToken}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, qs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                lifecyclePolicyText: void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText ? e.lifecyclePolicyText : void 0,
                                                nextToken: void 0 !== e.nextToken && null !== e.nextToken ? e.nextToken : void 0,
                                                previewResults: void 0 !== e.previewResults && null !== e.previewResults ? Ru(e.previewResults, t) : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0,
                                                status: void 0 !== e.status && null !== e.status ? e.status : void 0,
                                                summary: void 0 !== e.summary && null !== e.summary ? Nu(e.summary, t) : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), gl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "GetRegistryPolicyCommand",
                        inputFilterSensitiveLog: Zo.filterSensitiveLog,
                        outputFilterSensitiveLog: Qo.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var e, n;
                            return O(this, (function (r) {
                                return e = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetRegistryPolicy"
                                }, n = JSON.stringify({}), [2, Xu(t, e, "/", void 0, n)]
                            }))
                        }))
                    }(0, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ms(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                policyText: void 0 !== e.policyText && null !== e.policyText ? e.policyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), yl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "GetRepositoryPolicyCommand",
                        inputFilterSensitiveLog: ea.filterSensitiveLog,
                        outputFilterSensitiveLog: ta.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.GetRepositoryPolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Os(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                policyText: void 0 !== e.policyText && null !== e.policyText ? e.policyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), hl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "InitiateLayerUploadCommand",
                        inputFilterSensitiveLog: na.filterSensitiveLog,
                        outputFilterSensitiveLog: ra.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.InitiateLayerUpload"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Fs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                partSize: void 0 !== e.partSize && null !== e.partSize ? e.partSize : void 0,
                                                uploadId: void 0 !== e.uploadId && null !== e.uploadId ? e.uploadId : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), wl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "ListImagesCommand",
                        inputFilterSensitiveLog: oa.filterSensitiveLog,
                        outputFilterSensitiveLog: aa.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.ListImages"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D({}, void 0 !== e.filter && null !== e.filter && {filter: Fc(e.filter)}), void 0 !== e.maxResults && null !== e.maxResults && {maxResults: e.maxResults}), void 0 !== e.nextToken && null !== e.nextToken && {nextToken: e.nextToken}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, $s(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                imageIds: void 0 !== e.imageIds && null !== e.imageIds ? ru(e.imageIds, t) : void 0,
                                                nextToken: void 0 !== e.nextToken && null !== e.nextToken ? e.nextToken : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), bl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "ListTagsForResourceCommand",
                        inputFilterSensitiveLog: sa.filterSensitiveLog,
                        outputFilterSensitiveLog: ca.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.ListTagsForResource"
                                }, r = JSON.stringify(function (e, t) {
                                    return D({}, void 0 !== e.resourceArn && null !== e.resourceArn && {resourceArn: e.resourceArn})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, js(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {tags: void 0 !== e.tags && null !== e.tags ? Bu(e.tags, t) : void 0}
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), El = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "PutImageCommand",
                        inputFilterSensitiveLog: pa.filterSensitiveLog,
                        outputFilterSensitiveLog: fa.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutImage"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D(D({}, void 0 !== e.imageDigest && null !== e.imageDigest && {imageDigest: e.imageDigest}), void 0 !== e.imageManifest && null !== e.imageManifest && {imageManifest: e.imageManifest}), void 0 !== e.imageManifestMediaType && null !== e.imageManifestMediaType && {imageManifestMediaType: e.imageManifestMediaType}), void 0 !== e.imageTag && null !== e.imageTag && {imageTag: e.imageTag}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, _s(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {image: void 0 !== e.image && null !== e.image ? Yc(e.image, t) : void 0}
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Sl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "PutImageScanningConfigurationCommand",
                        inputFilterSensitiveLog: va.filterSensitiveLog,
                        outputFilterSensitiveLog: ga.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutImageScanningConfiguration"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.imageScanningConfiguration && null !== e.imageScanningConfiguration && {imageScanningConfiguration: qc(e.imageScanningConfiguration, t)}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Us(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                imageScanningConfiguration: void 0 !== e.imageScanningConfiguration && null !== e.imageScanningConfiguration ? uu(e.imageScanningConfiguration) : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), xl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "PutImageTagMutabilityCommand",
                        inputFilterSensitiveLog: ya.filterSensitiveLog,
                        outputFilterSensitiveLog: ha.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutImageTagMutability"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.imageTagMutability && null !== e.imageTagMutability && {imageTagMutability: e.imageTagMutability}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Vs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                imageTagMutability: void 0 !== e.imageTagMutability && null !== e.imageTagMutability ? e.imageTagMutability : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Il = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "PutLifecyclePolicyCommand",
                        inputFilterSensitiveLog: wa.filterSensitiveLog,
                        outputFilterSensitiveLog: ba.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutLifecyclePolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText && {lifecyclePolicyText: e.lifecyclePolicyText}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Bs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                lifecyclePolicyText: void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText ? e.lifecyclePolicyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Cl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "PutRegistryPolicyCommand",
                        inputFilterSensitiveLog: Ea.filterSensitiveLog,
                        outputFilterSensitiveLog: Sa.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutRegistryPolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D({}, void 0 !== e.policyText && null !== e.policyText && {policyText: e.policyText})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Hs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                policyText: void 0 !== e.policyText && null !== e.policyText ? e.policyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Tl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "PutReplicationConfigurationCommand",
                        inputFilterSensitiveLog: xa.filterSensitiveLog,
                        outputFilterSensitiveLog: Ia.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.PutReplicationConfiguration"
                                }, r = JSON.stringify(function (e, t) {
                                    return D({}, void 0 !== e.replicationConfiguration && null !== e.replicationConfiguration && {replicationConfiguration: jc(e.replicationConfiguration, t)})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Gs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {replicationConfiguration: void 0 !== e.replicationConfiguration && null !== e.replicationConfiguration ? zu(e.replicationConfiguration, t) : void 0}
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Rl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "SetRepositoryPolicyCommand",
                        inputFilterSensitiveLog: Ca.filterSensitiveLog,
                        outputFilterSensitiveLog: Ta.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.SetRepositoryPolicy"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D({}, void 0 !== e.force && null !== e.force && {force: e.force}), void 0 !== e.policyText && null !== e.policyText && {policyText: e.policyText}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ks(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                policyText: void 0 !== e.policyText && null !== e.policyText ? e.policyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Nl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "StartImageScanCommand",
                        inputFilterSensitiveLog: Ra.filterSensitiveLog,
                        outputFilterSensitiveLog: Na.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.StartImageScan"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.imageId && null !== e.imageId && {imageId: zc(e.imageId, t)}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ws(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                imageId: void 0 !== e.imageId && null !== e.imageId ? nu(e.imageId, t) : void 0,
                                                imageScanStatus: void 0 !== e.imageScanStatus && null !== e.imageScanStatus ? lu(e.imageScanStatus, t) : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0
                                            }
                                        }(n, t), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Pl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "StartLifecyclePolicyPreviewCommand",
                        inputFilterSensitiveLog: Aa.filterSensitiveLog,
                        outputFilterSensitiveLog: ka.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.StartLifecyclePolicyPreview"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D({}, void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText && {lifecyclePolicyText: e.lifecyclePolicyText}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Js(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                lifecyclePolicyText: void 0 !== e.lifecyclePolicyText && null !== e.lifecyclePolicyText ? e.lifecyclePolicyText : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0,
                                                status: void 0 !== e.status && null !== e.status ? e.status : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Ll = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "TagResourceCommand",
                        inputFilterSensitiveLog: za.filterSensitiveLog,
                        outputFilterSensitiveLog: Da.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.TagResource"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.resourceArn && null !== e.resourceArn && {resourceArn: e.resourceArn}), void 0 !== e.tags && null !== e.tags && {tags: Hc(e.tags, t)})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                switch (i.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Xs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return i.sent(), n = {}, r = D({$metadata: Ju(e)}, n), [2, Promise.resolve(r)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), Al = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "UntagResourceCommand",
                        inputFilterSensitiveLog: qa.filterSensitiveLog,
                        outputFilterSensitiveLog: Ma.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.UntagResource"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D({}, void 0 !== e.resourceArn && null !== e.resourceArn && {resourceArn: e.resourceArn}), void 0 !== e.tagKeys && null !== e.tagKeys && {tagKeys: Bc(e.tagKeys)})
                                }(e)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                switch (i.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Ys(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return i.sent(), n = {}, r = D({$metadata: Ju(e)}, n), [2, Promise.resolve(r)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), kl = function (e) {
                function t(t) {
                    var n = e.call(this) || this;
                    return n.input = t, n
                }

                return i(t, e), t.prototype.resolveMiddleware = function (e, t, n) {
                    this.middlewareStack.use(ke(t, this.serialize, this.deserialize));
                    var r = e.concat(this.middlewareStack), i = {
                        logger: t.logger,
                        clientName: "ECRClient",
                        commandName: "UploadLayerPartCommand",
                        inputFilterSensitiveLog: Fa.filterSensitiveLog,
                        outputFilterSensitiveLog: $a.filterSensitiveLog
                    }, o = t.requestHandler;
                    return r.resolve((function (e) {
                        return o.handle(e.request, n || {})
                    }), i)
                }, t.prototype.serialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r;
                            return O(this, (function (i) {
                                return n = {
                                    "content-type": "application/x-amz-json-1.1",
                                    "x-amz-target": "AmazonEC2ContainerRegistry_V20150921.UploadLayerPart"
                                }, r = JSON.stringify(function (e, t) {
                                    return D(D(D(D(D(D({}, void 0 !== e.layerPartBlob && null !== e.layerPartBlob && {layerPartBlob: t.base64Encoder(e.layerPartBlob)}), void 0 !== e.partFirstByte && null !== e.partFirstByte && {partFirstByte: e.partFirstByte}), void 0 !== e.partLastByte && null !== e.partLastByte && {partLastByte: e.partLastByte}), void 0 !== e.registryId && null !== e.registryId && {registryId: e.registryId}), void 0 !== e.repositoryName && null !== e.repositoryName && {repositoryName: e.repositoryName}), void 0 !== e.uploadId && null !== e.uploadId && {uploadId: e.uploadId})
                                }(e, t)), [2, Xu(t, n, "/", void 0, r)]
                            }))
                        }))
                    }(e, t)
                }, t.prototype.deserialize = function (e, t) {
                    return function (e, t) {
                        return M(void 0, void 0, void 0, (function () {
                            var n, r, i;
                            return O(this, (function (o) {
                                switch (o.label) {
                                    case 0:
                                        return e.statusCode >= 300 ? [2, Zs(e, t)] : [4, Yu(e.body, t)];
                                    case 1:
                                        return n = o.sent(), r = function (e, t) {
                                            return {
                                                lastByteReceived: void 0 !== e.lastByteReceived && null !== e.lastByteReceived ? e.lastByteReceived : void 0,
                                                registryId: void 0 !== e.registryId && null !== e.registryId ? e.registryId : void 0,
                                                repositoryName: void 0 !== e.repositoryName && null !== e.repositoryName ? e.repositoryName : void 0,
                                                uploadId: void 0 !== e.uploadId && null !== e.uploadId ? e.uploadId : void 0
                                            }
                                        }(n), i = D({$metadata: Ju(e)}, r), [2, Promise.resolve(i)]
                                }
                            }))
                        }))
                    }(e, t)
                }, t
            }(J), zl = function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }

                return i(t, e), t.prototype.batchCheckLayerAvailability = function (e, t, n) {
                    var r = new Qu(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.batchDeleteImage = function (e, t, n) {
                    var r = new el(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.batchGetImage = function (e, t, n) {
                    var r = new tl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.completeLayerUpload = function (e, t, n) {
                    var r = new nl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.createRepository = function (e, t, n) {
                    var r = new rl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.deleteLifecyclePolicy = function (e, t, n) {
                    var r = new il(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.deleteRegistryPolicy = function (e, t, n) {
                    var r = new ol(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.deleteRepository = function (e, t, n) {
                    var r = new al(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.deleteRepositoryPolicy = function (e, t, n) {
                    var r = new sl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.describeImages = function (e, t, n) {
                    var r = new ul(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.describeImageScanFindings = function (e, t, n) {
                    var r = new cl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.describeRegistry = function (e, t, n) {
                    var r = new ll(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.describeRepositories = function (e, t, n) {
                    var r = new dl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.getAuthorizationToken = function (e, t, n) {
                    var r = new pl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.getDownloadUrlForLayer = function (e, t, n) {
                    var r = new fl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.getLifecyclePolicy = function (e, t, n) {
                    var r = new ml(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.getLifecyclePolicyPreview = function (e, t, n) {
                    var r = new vl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.getRegistryPolicy = function (e, t, n) {
                    var r = new gl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.getRepositoryPolicy = function (e, t, n) {
                    var r = new yl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.initiateLayerUpload = function (e, t, n) {
                    var r = new hl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.listImages = function (e, t, n) {
                    var r = new wl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.listTagsForResource = function (e, t, n) {
                    var r = new bl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.putImage = function (e, t, n) {
                    var r = new El(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.putImageScanningConfiguration = function (e, t, n) {
                    var r = new Sl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.putImageTagMutability = function (e, t, n) {
                    var r = new xl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.putLifecyclePolicy = function (e, t, n) {
                    var r = new Il(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.putRegistryPolicy = function (e, t, n) {
                    var r = new Cl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.putReplicationConfiguration = function (e, t, n) {
                    var r = new Tl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.setRepositoryPolicy = function (e, t, n) {
                    var r = new Rl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.startImageScan = function (e, t, n) {
                    var r = new Nl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.startLifecyclePolicyPreview = function (e, t, n) {
                    var r = new Pl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.tagResource = function (e, t, n) {
                    var r = new Ll(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.untagResource = function (e, t, n) {
                    var r = new Al(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t.prototype.uploadLayerPart = function (e, t, n) {
                    var r = new kl(e);
                    if ("function" == typeof t) this.send(r, t); else {
                        if ("function" != typeof n) return this.send(r, t);
                        if ("object" != typeof t) throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }, t
            }(hs), Dl = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.send.apply(e, j([new ul(t)], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, ql = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.describeImages.apply(e, j([t], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            };

            function Ml(e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return U(this, arguments, (function () {
                    var r, i, o;
                    return O(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                r = e.startingToken || void 0, i = !0, a.label = 1;
                            case 1:
                                return i ? (t.nextToken = r, t.maxResults = e.pageSize, e.client instanceof zl ? [4, _(ql.apply(void 0, j([e.client, t], $(n))))] : [3, 3]) : [3, 9];
                            case 2:
                                return o = a.sent(), [3, 6];
                            case 3:
                                return e.client instanceof hs ? [4, _(Dl.apply(void 0, j([e.client, t], $(n))))] : [3, 5];
                            case 4:
                                return o = a.sent(), [3, 6];
                            case 5:
                                throw new Error("Invalid client, expected ECR | ECRClient");
                            case 6:
                                return [4, _(o)];
                            case 7:
                                return [4, a.sent()];
                            case 8:
                                return a.sent(), r = o.nextToken, i = !!r, [3, 1];
                            case 9:
                                return [4, _(void 0)];
                            case 10:
                                return [2, a.sent()]
                        }
                    }))
                }))
            }

            var Ol = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.send.apply(e, j([new cl(t)], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, Fl = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.describeImageScanFindings.apply(e, j([t], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            };

            function $l(e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return U(this, arguments, (function () {
                    var r, i, o;
                    return O(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                r = e.startingToken || void 0, i = !0, a.label = 1;
                            case 1:
                                return i ? (t.nextToken = r, t.maxResults = e.pageSize, e.client instanceof zl ? [4, _(Fl.apply(void 0, j([e.client, t], $(n))))] : [3, 3]) : [3, 9];
                            case 2:
                                return o = a.sent(), [3, 6];
                            case 3:
                                return e.client instanceof hs ? [4, _(Ol.apply(void 0, j([e.client, t], $(n))))] : [3, 5];
                            case 4:
                                return o = a.sent(), [3, 6];
                            case 5:
                                throw new Error("Invalid client, expected ECR | ECRClient");
                            case 6:
                                return [4, _(o)];
                            case 7:
                                return [4, a.sent()];
                            case 8:
                                return a.sent(), r = o.nextToken, i = !!r, [3, 1];
                            case 9:
                                return [4, _(void 0)];
                            case 10:
                                return [2, a.sent()]
                        }
                    }))
                }))
            }

            var jl, _l = {minDelay: 2, maxDelay: 120};
            !function (e) {
                e.ABORTED = "ABORTED", e.FAILURE = "FAILURE", e.SUCCESS = "SUCCESS", e.RETRY = "RETRY", e.TIMEOUT = "TIMEOUT"
            }(jl || (jl = {}));
            var Ul = function (e) {
                if (e.state === jl.ABORTED) {
                    var t = new Error("" + JSON.stringify(D(D({}, e), {reason: "Request was aborted"})));
                    throw t.name = "AbortError", t
                }
                if (e.state === jl.TIMEOUT) {
                    var n = new Error("" + JSON.stringify(D(D({}, e), {reason: "Waiter has timed out"})));
                    throw n.name = "TimeoutError", n
                }
                if (e.state !== jl.SUCCESS) throw new Error("" + JSON.stringify({result: e}));
                return e
            }, Vl = function (e, t, n) {
                var r = e.minDelay, i = e.maxDelay, o = e.maxWaitTime, a = e.abortController, s = e.client,
                    c = e.abortSignal;
                return M(void 0, void 0, void 0, (function () {
                    var e, u, l, d, p, f, m;
                    return O(this, (function (v) {
                        switch (v.label) {
                            case 0:
                                return [4, n(s, t)];
                            case 1:
                                if ((e = v.sent().state) !== jl.RETRY) return [2, {state: e}];
                                u = 1, l = Date.now() + 1e3 * o, d = Math.log(i / r) / Math.log(2) + 1, v.label = 2;
                            case 2:
                                return (null === (m = null == a ? void 0 : a.signal) || void 0 === m ? void 0 : m.aborted) || (null == c ? void 0 : c.aborted) ? [2, {state: jl.ABORTED}] : (p = function (e, t, n, r) {
                                    if (r > n) return t;
                                    var i, o, a = e * Math.pow(2, r - 1);
                                    return o = a, (i = e) + Math.random() * (o - i)
                                }(r, i, d, u), Date.now() + 1e3 * p > l ? [2, {state: jl.TIMEOUT}] : [4, (g = p, new Promise((function (e) {
                                    return setTimeout(e, 1e3 * g)
                                })))]);
                            case 3:
                                return v.sent(), [4, n(s, t)];
                            case 4:
                                return (f = v.sent().state) !== jl.RETRY ? [2, {state: f}] : (u += 1, [3, 2]);
                            case 5:
                                return [2]
                        }
                        var g
                    }))
                }))
            }, Bl = function (e) {
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (t) {
                        return [2, new Promise((function (t) {
                            e.onabort = function () {
                                return t({state: jl.ABORTED})
                            }
                        }))]
                    }))
                }))
            }, Hl = function (e, t, n) {
                return M(void 0, void 0, void 0, (function () {
                    var r, i;
                    return O(this, (function (o) {
                        return function (e) {
                            if (e.maxWaitTime < 1) throw new Error("WaiterConfiguration.maxWaitTime must be greater than 0");
                            if (e.minDelay < 1) throw new Error("WaiterConfiguration.minDelay must be greater than 0");
                            if (e.maxDelay < 1) throw new Error("WaiterConfiguration.maxDelay must be greater than 0");
                            if (e.maxWaitTime <= e.minDelay) throw new Error("WaiterConfiguration.maxWaitTime [" + e.maxWaitTime + "] must be greater than WaiterConfiguration.minDelay [" + e.minDelay + "] for this waiter");
                            if (e.maxDelay < e.minDelay) throw new Error("WaiterConfiguration.maxDelay [" + e.maxDelay + "] must be greater than WaiterConfiguration.minDelay [" + e.minDelay + "] for this waiter")
                        }(r = D(D({}, _l), e)), i = [Vl(r, t, n)], e.abortController && i.push(Bl(e.abortController.signal)), e.abortSignal && i.push(Bl(e.abortSignal)), [2, Promise.race(i)]
                    }))
                }))
            }, Gl = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i;
                    return O(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return o.trys.push([0, 2, , 3]), [4, e.send(new cl(t))];
                            case 1:
                                r = o.sent(), n = r;
                                try {
                                    if ("COMPLETE" === r.imageScanStatus.status) return [2, {
                                        state: jl.SUCCESS,
                                        reason: n
                                    }]
                                } catch (e) {
                                }
                                try {
                                    if ("FAILED" === r.imageScanStatus.status) return [2, {
                                        state: jl.FAILURE,
                                        reason: n
                                    }]
                                } catch (e) {
                                }
                                return [3, 3];
                            case 2:
                                return i = o.sent(), n = i, [3, 3];
                            case 3:
                                return [2, {state: jl.RETRY, reason: n}]
                        }
                    }))
                }))
            }, Kl = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (n) {
                        return [2, Hl(D(D({}, {minDelay: 5, maxDelay: 120}), e), t, Gl)]
                    }))
                }))
            }, Wl = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n;
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, Hl(D(D({}, {minDelay: 5, maxDelay: 120}), e), t, Gl)];
                            case 1:
                                return n = r.sent(), [2, Ul(n)]
                        }
                    }))
                }))
            }, Jl = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.send.apply(e, j([new dl(t)], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, Xl = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.describeRepositories.apply(e, j([t], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            };

            function Yl(e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return U(this, arguments, (function () {
                    var r, i, o;
                    return O(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                r = e.startingToken || void 0, i = !0, a.label = 1;
                            case 1:
                                return i ? (t.nextToken = r, t.maxResults = e.pageSize, e.client instanceof zl ? [4, _(Xl.apply(void 0, j([e.client, t], $(n))))] : [3, 3]) : [3, 9];
                            case 2:
                                return o = a.sent(), [3, 6];
                            case 3:
                                return e.client instanceof hs ? [4, _(Jl.apply(void 0, j([e.client, t], $(n))))] : [3, 5];
                            case 4:
                                return o = a.sent(), [3, 6];
                            case 5:
                                throw new Error("Invalid client, expected ECR | ECRClient");
                            case 6:
                                return [4, _(o)];
                            case 7:
                                return [4, a.sent()];
                            case 8:
                                return a.sent(), r = o.nextToken, i = !!r, [3, 1];
                            case 9:
                                return [4, _(void 0)];
                            case 10:
                                return [2, a.sent()]
                        }
                    }))
                }))
            }

            var Zl = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.send.apply(e, j([new vl(t)], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, Ql = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.getLifecyclePolicyPreview.apply(e, j([t], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            };

            function ed(e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return U(this, arguments, (function () {
                    var r, i, o;
                    return O(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                r = e.startingToken || void 0, i = !0, a.label = 1;
                            case 1:
                                return i ? (t.nextToken = r, t.maxResults = e.pageSize, e.client instanceof zl ? [4, _(Ql.apply(void 0, j([e.client, t], $(n))))] : [3, 3]) : [3, 9];
                            case 2:
                                return o = a.sent(), [3, 6];
                            case 3:
                                return e.client instanceof hs ? [4, _(Zl.apply(void 0, j([e.client, t], $(n))))] : [3, 5];
                            case 4:
                                return o = a.sent(), [3, 6];
                            case 5:
                                throw new Error("Invalid client, expected ECR | ECRClient");
                            case 6:
                                return [4, _(o)];
                            case 7:
                                return [4, a.sent()];
                            case 8:
                                return a.sent(), r = o.nextToken, i = !!r, [3, 1];
                            case 9:
                                return [4, _(void 0)];
                            case 10:
                                return [2, a.sent()]
                        }
                    }))
                }))
            }

            var td = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n, r, i;
                    return O(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return o.trys.push([0, 2, , 3]), [4, e.send(new vl(t))];
                            case 1:
                                r = o.sent(), n = r;
                                try {
                                    if ("COMPLETE" === r.status) return [2, {state: jl.SUCCESS, reason: n}]
                                } catch (e) {
                                }
                                try {
                                    if ("FAILED" === r.status) return [2, {state: jl.FAILURE, reason: n}]
                                } catch (e) {
                                }
                                return [3, 3];
                            case 2:
                                return i = o.sent(), n = i, [3, 3];
                            case 3:
                                return [2, {state: jl.RETRY, reason: n}]
                        }
                    }))
                }))
            }, nd = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (n) {
                        return [2, Hl(D(D({}, {minDelay: 5, maxDelay: 120}), e), t, td)]
                    }))
                }))
            }, rd = function (e, t) {
                return M(void 0, void 0, void 0, (function () {
                    var n;
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, Hl(D(D({}, {minDelay: 5, maxDelay: 120}), e), t, td)];
                            case 1:
                                return n = r.sent(), [2, Ul(n)]
                        }
                    }))
                }))
            }, id = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.send.apply(e, j([new wl(t)], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, od = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return M(void 0, void 0, void 0, (function () {
                    return O(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.listImages.apply(e, j([t], $(n)))];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            };

            function ad(e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return U(this, arguments, (function () {
                    var r, i, o;
                    return O(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                r = e.startingToken || void 0, i = !0, a.label = 1;
                            case 1:
                                return i ? (t.nextToken = r, t.maxResults = e.pageSize, e.client instanceof zl ? [4, _(od.apply(void 0, j([e.client, t], $(n))))] : [3, 3]) : [3, 9];
                            case 2:
                                return o = a.sent(), [3, 6];
                            case 3:
                                return e.client instanceof hs ? [4, _(id.apply(void 0, j([e.client, t], $(n))))] : [3, 5];
                            case 4:
                                return o = a.sent(), [3, 6];
                            case 5:
                                throw new Error("Invalid client, expected ECR | ECRClient");
                            case 6:
                                return [4, _(o)];
                            case 7:
                                return [4, a.sent()];
                            case 8:
                                return a.sent(), r = o.nextToken, i = !!r, [3, 1];
                            case 9:
                                return [4, _(void 0)];
                            case 10:
                                return [2, a.sent()]
                        }
                    }))
                }))
            }
        }, 76: function (e, t, n) {
            "use strict";
            var r = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {default: e}
            };
            Object.defineProperty(t, "__esModule", {value: !0}), t.decodeHTML = t.decodeHTMLStrict = t.decodeXML = void 0;
            var i = r(n(7)), o = r(n(802)), a = r(n(228)), s = r(n(26)),
                c = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;

            function u(e) {
                var t = d(e);
                return function (e) {
                    return String(e).replace(c, t)
                }
            }

            t.decodeXML = u(a.default), t.decodeHTMLStrict = u(i.default);
            var l = function (e, t) {
                return e < t ? 1 : -1
            };

            function d(e) {
                return function (t) {
                    if ("#" === t.charAt(1)) {
                        var n = t.charAt(2);
                        return "X" === n || "x" === n ? s.default(parseInt(t.substr(3), 16)) : s.default(parseInt(t.substr(2), 10))
                    }
                    return e[t.slice(1, -1)] || t
                }
            }

            t.decodeHTML = function () {
                for (var e = Object.keys(o.default).sort(l), t = Object.keys(i.default).sort(l), n = 0, r = 0; n < t.length; n++) e[r] === t[n] ? (t[n] += ";?", r++) : t[n] += ";";
                var a = new RegExp("&(?:" + t.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), s = d(i.default);

                function c(e) {
                    return ";" !== e.substr(-1) && (e += ";"), s(e)
                }

                return function (e) {
                    return String(e).replace(a, c)
                }
            }()
        }, 26: function (e, t, n) {
            "use strict";
            var r = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {default: e}
            };
            Object.defineProperty(t, "__esModule", {value: !0});
            var i = r(n(589)), o = String.fromCodePoint || function (e) {
                var t = "";
                return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t + String.fromCharCode(e)
            };
            t.default = function (e) {
                return e >= 55296 && e <= 57343 || e > 1114111 ? "�" : (e in i.default && (e = i.default[e]), o(e))
            }
        }, 322: function (e, t, n) {
            "use strict";
            var r = this && this.__importDefault || function (e) {
                return e && e.__esModule ? e : {default: e}
            };
            Object.defineProperty(t, "__esModule", {value: !0}), t.escapeUTF8 = t.escape = t.encodeNonAsciiHTML = t.encodeHTML = t.encodeXML = void 0;
            var i = l(r(n(228)).default), o = d(i);
            t.encodeXML = g(i);
            var a, s, c = l(r(n(7)).default), u = d(c);

            function l(e) {
                return Object.keys(e).sort().reduce((function (t, n) {
                    return t[e[n]] = "&" + n + ";", t
                }), {})
            }

            function d(e) {
                for (var t = [], n = [], r = 0, i = Object.keys(e); r < i.length; r++) {
                    var o = i[r];
                    1 === o.length ? t.push("\\" + o) : n.push(o)
                }
                t.sort();
                for (var a = 0; a < t.length - 1; a++) {
                    for (var s = a; s < t.length - 1 && t[s].charCodeAt(1) + 1 === t[s + 1].charCodeAt(1);) s += 1;
                    var c = 1 + s - a;
                    c < 3 || t.splice(a, c, t[a] + "-" + t[s])
                }
                return n.unshift("[" + t.join("") + "]"), new RegExp(n.join("|"), "g")
            }

            t.encodeHTML = (a = c, s = u, function (e) {
                return e.replace(s, (function (e) {
                    return a[e]
                })).replace(p, m)
            }), t.encodeNonAsciiHTML = g(c);
            var p = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                f = null != String.prototype.codePointAt ? function (e) {
                    return e.codePointAt(0)
                } : function (e) {
                    return 1024 * (e.charCodeAt(0) - 55296) + e.charCodeAt(1) - 56320 + 65536
                };

            function m(e) {
                return "&#x" + (e.length > 1 ? f(e) : e.charCodeAt(0)).toString(16).toUpperCase() + ";"
            }

            var v = new RegExp(o.source + "|" + p.source, "g");

            function g(e) {
                return function (t) {
                    return t.replace(v, (function (t) {
                        return e[t] || m(t)
                    }))
                }
            }

            t.escape = function (e) {
                return e.replace(v, m)
            }, t.escapeUTF8 = function (e) {
                return e.replace(o, m)
            }
        }, 863: (e, t, n) => {
            "use strict";
            t.p1 = void 0;
            n(76), n(322), n(322);
            var r = n(76);
            Object.defineProperty(t, "p1", {
                enumerable: !0, get: function () {
                    return r.decodeHTML
                }
            })
        }, 589: e => {
            "use strict";
            e.exports = JSON.parse('{"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}')
        }, 7: e => {
            "use strict";
            e.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"\'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\\"","QUOT":"\\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}')
        }, 802: e => {
            "use strict";
            e.exports = JSON.parse('{"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\\"","QUOT":"\\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}')
        }, 228: e => {
            "use strict";
            e.exports = JSON.parse('{"amp":"&","apos":"\'","gt":">","lt":"<","quot":"\\""}')
        }, 259: (e, t, n) => {
            "use strict";
            const r = n(849).buildOptions, i = {
                    attributeNamePrefix: "@_",
                    attrNodeName: !1,
                    textNodeName: "#text",
                    ignoreAttributes: !0,
                    cdataTagName: !1,
                    cdataPositionChar: "\\c",
                    format: !1,
                    indentBy: "  ",
                    supressEmptyNode: !1,
                    tagValueProcessor: function (e) {
                        return e
                    },
                    attrValueProcessor: function (e) {
                        return e
                    }
                },
                o = ["attributeNamePrefix", "attrNodeName", "textNodeName", "ignoreAttributes", "cdataTagName", "cdataPositionChar", "format", "indentBy", "supressEmptyNode", "tagValueProcessor", "attrValueProcessor"];

            function a(e) {
                this.options = r(e, i, o), this.options.ignoreAttributes || this.options.attrNodeName ? this.isAttribute = function () {
                    return !1
                } : (this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = m), this.options.cdataTagName ? this.isCDATA = v : this.isCDATA = function () {
                    return !1
                }, this.replaceCDATAstr = s, this.replaceCDATAarr = c, this.options.format ? (this.indentate = f, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function () {
                    return ""
                }, this.tagEndChar = ">", this.newLine = ""), this.options.supressEmptyNode ? (this.buildTextNode = p, this.buildObjNode = l) : (this.buildTextNode = d, this.buildObjNode = u), this.buildTextValNode = d, this.buildObjectNode = u
            }

            function s(e, t) {
                return e = this.options.tagValueProcessor("" + e), "" === this.options.cdataPositionChar || "" === e ? e + "<![CDATA[" + t + "]]" + this.tagEndChar : e.replace(this.options.cdataPositionChar, "<![CDATA[" + t + "]]" + this.tagEndChar)
            }

            function c(e, t) {
                if (e = this.options.tagValueProcessor("" + e), "" === this.options.cdataPositionChar || "" === e) return e + "<![CDATA[" + t.join("]]><![CDATA[") + "]]" + this.tagEndChar;
                for (let n in t) e = e.replace(this.options.cdataPositionChar, "<![CDATA[" + t[n] + "]]>");
                return e + this.newLine
            }

            function u(e, t, n, r) {
                return n && !e.includes("<") ? this.indentate(r) + "<" + t + n + ">" + e + "</" + t + this.tagEndChar : this.indentate(r) + "<" + t + n + this.tagEndChar + e + this.indentate(r) + "</" + t + this.tagEndChar
            }

            function l(e, t, n, r) {
                return "" !== e ? this.buildObjectNode(e, t, n, r) : this.indentate(r) + "<" + t + n + "/" + this.tagEndChar
            }

            function d(e, t, n, r) {
                return this.indentate(r) + "<" + t + n + ">" + this.options.tagValueProcessor(e) + "</" + t + this.tagEndChar
            }

            function p(e, t, n, r) {
                return "" !== e ? this.buildTextValNode(e, t, n, r) : this.indentate(r) + "<" + t + n + "/" + this.tagEndChar
            }

            function f(e) {
                return this.options.indentBy.repeat(e)
            }

            function m(e) {
                return !!e.startsWith(this.options.attributeNamePrefix) && e.substr(this.attrPrefixLen)
            }

            function v(e) {
                return e === this.options.cdataTagName
            }

            a.prototype.parse = function (e) {
                return this.j2x(e, 0).val
            }, a.prototype.j2x = function (e, t) {
                let n = "", r = "";
                const i = Object.keys(e), o = i.length;
                for (let a = 0; a < o; a++) {
                    const o = i[a];
                    if (void 0 === e[o]) ; else if (null === e[o]) r += this.indentate(t) + "<" + o + "/" + this.tagEndChar; else if (e[o] instanceof Date) r += this.buildTextNode(e[o], o, "", t); else if ("object" != typeof e[o]) {
                        const i = this.isAttribute(o);
                        i ? n += " " + i + '="' + this.options.attrValueProcessor("" + e[o]) + '"' : this.isCDATA(o) ? e[this.options.textNodeName] ? r += this.replaceCDATAstr(e[this.options.textNodeName], e[o]) : r += this.replaceCDATAstr("", e[o]) : o === this.options.textNodeName ? e[this.options.cdataTagName] || (r += this.options.tagValueProcessor("" + e[o])) : r += this.buildTextNode(e[o], o, "", t)
                    } else if (Array.isArray(e[o])) if (this.isCDATA(o)) r += this.indentate(t), e[this.options.textNodeName] ? r += this.replaceCDATAarr(e[this.options.textNodeName], e[o]) : r += this.replaceCDATAarr("", e[o]); else {
                        const n = e[o].length;
                        for (let i = 0; i < n; i++) {
                            const n = e[o][i];
                            if (void 0 === n) ; else if (null === n) r += this.indentate(t) + "<" + o + "/" + this.tagEndChar; else if ("object" == typeof n) {
                                const e = this.j2x(n, t + 1);
                                r += this.buildObjNode(e.val, o, e.attrStr, t)
                            } else r += this.buildTextNode(n, o, "", t)
                        }
                    } else if (this.options.attrNodeName && o === this.options.attrNodeName) {
                        const t = Object.keys(e[o]), r = t.length;
                        for (let i = 0; i < r; i++) n += " " + t[i] + '="' + this.options.attrValueProcessor("" + e[o][t[i]]) + '"'
                    } else {
                        const n = this.j2x(e[o], t + 1);
                        r += this.buildObjNode(n.val, o, n.attrStr, t)
                    }
                }
                return {attrStr: n, val: r}
            }, e.exports = a
        }, 398: (e, t, n) => {
            "use strict";
            const r = function (e) {
                    return String.fromCharCode(e)
                }, i = {
                    nilChar: r(176),
                    missingChar: r(201),
                    nilPremitive: r(175),
                    missingPremitive: r(200),
                    emptyChar: r(178),
                    emptyValue: r(177),
                    boundryChar: r(179),
                    objStart: r(198),
                    arrStart: r(204),
                    arrayEnd: r(185)
                },
                o = [i.nilChar, i.nilPremitive, i.missingChar, i.missingPremitive, i.boundryChar, i.emptyChar, i.emptyValue, i.arrayEnd, i.objStart, i.arrStart],
                a = function (e, t, n) {
                    if ("string" == typeof t) return e && e[0] && void 0 !== e[0].val ? s(e[0].val, t) : s(e, t);
                    {
                        const o = void 0 === (r = e) ? i.missingChar : null === r ? i.nilChar : !(r.child && 0 === Object.keys(r.child).length && (!r.attrsMap || 0 === Object.keys(r.attrsMap).length)) || i.emptyChar;
                        if (!0 === o) {
                            let r = "";
                            if (Array.isArray(t)) {
                                r += i.arrStart;
                                const o = t[0], u = e.length;
                                if ("string" == typeof o) for (let t = 0; t < u; t++) {
                                    const n = s(e[t].val, o);
                                    r = c(r, n)
                                } else for (let t = 0; t < u; t++) {
                                    const i = a(e[t], o, n);
                                    r = c(r, i)
                                }
                                r += i.arrayEnd
                            } else {
                                r += i.objStart;
                                const o = Object.keys(t);
                                Array.isArray(e) && (e = e[0]);
                                for (let i in o) {
                                    const s = o[i];
                                    let u;
                                    u = !n.ignoreAttributes && e.attrsMap && e.attrsMap[s] ? a(e.attrsMap[s], t[s], n) : s === n.textNodeName ? a(e.val, t[s], n) : a(e.child[s], t[s], n), r = c(r, u)
                                }
                            }
                            return r
                        }
                        return o
                    }
                    var r
                }, s = function (e) {
                    switch (e) {
                        case void 0:
                            return i.missingPremitive;
                        case null:
                            return i.nilPremitive;
                        case"":
                            return i.emptyValue;
                        default:
                            return e
                    }
                }, c = function (e, t) {
                    return u(t[0]) || u(e[e.length - 1]) || (e += i.boundryChar), e + t
                }, u = function (e) {
                    return -1 !== o.indexOf(e)
                }, l = n(543), d = n(849).buildOptions;
            t.convert2nimn = function (e, t, n) {
                return n = d(n, l.defaultOptions, l.props), a(e, t, n)
            }
        }, 284: (e, t, n) => {
            "use strict";
            const r = n(849), i = function (e, t, n) {
                const o = {};
                if ((!e.child || r.isEmptyObject(e.child)) && (!e.attrsMap || r.isEmptyObject(e.attrsMap))) return r.isExist(e.val) ? e.val : "";
                if (r.isExist(e.val) && ("string" != typeof e.val || "" !== e.val && e.val !== t.cdataPositionChar)) {
                    const i = r.isTagNameInArrayMode(e.tagname, t.arrayMode, n);
                    o[t.textNodeName] = i ? [e.val] : e.val
                }
                r.merge(o, e.attrsMap, t.arrayMode);
                const a = Object.keys(e.child);
                for (let s = 0; s < a.length; s++) {
                    const c = a[s];
                    if (e.child[c] && e.child[c].length > 1) {
                        o[c] = [];
                        for (let n in e.child[c]) e.child[c].hasOwnProperty(n) && o[c].push(i(e.child[c][n], t, c))
                    } else {
                        const a = i(e.child[c][0], t, c),
                            s = !0 === t.arrayMode && "object" == typeof a || r.isTagNameInArrayMode(c, t.arrayMode, n);
                        o[c] = s ? [a] : a
                    }
                }
                return o
            };
            t.convertToJson = i
        }, 702: (e, t, n) => {
            "use strict";
            const r = n(849), i = n(849).buildOptions, o = n(543), a = function (e, t, n) {
                let i = "{";
                const o = Object.keys(e.child);
                for (let n = 0; n < o.length; n++) {
                    var s = o[n];
                    if (e.child[s] && e.child[s].length > 1) {
                        for (var c in i += '"' + s + '" : [ ', e.child[s]) i += a(e.child[s][c], t) + " , ";
                        i = i.substr(0, i.length - 1) + " ] "
                    } else i += '"' + s + '" : ' + a(e.child[s][0], t) + " ,"
                }
                return r.merge(i, e.attrsMap), r.isEmptyObject(i) ? r.isExist(e.val) ? e.val : "" : (r.isExist(e.val) && ("string" != typeof e.val || "" !== e.val && e.val !== t.cdataPositionChar) && (i += '"' + t.textNodeName + '" : ' + (!0 !== (u = e.val) && !1 !== u && isNaN(u) ? '"' + u + '"' : u)), "," === i[i.length - 1] && (i = i.substr(0, i.length - 2)), i + "}");
                var u
            };
            t.convertToJsonString = function (e, t) {
                return (t = i(t, o.defaultOptions, o.props)).indentBy = t.indentBy || "", a(e, t, 0)
            }
        }, 965: (e, t, n) => {
            "use strict";
            const r = n(284), i = n(543), o = n(543), a = n(849).buildOptions, s = n(501);
            t.parse = function (e, t, n) {
                if (n) {
                    !0 === n && (n = {});
                    const t = s.validate(e, n);
                    if (!0 !== t) throw Error(t.err.msg)
                }
                t = a(t, o.defaultOptions, o.props);
                const c = i.getTraversalObj(e, t);
                return r.convertToJson(c, t)
            }, t.convertTonimn = n(398).convert2nimn, t.getTraversalObj = i.getTraversalObj, t.convertToJson = r.convertToJson, t.convertToJsonString = n(702).convertToJsonString, t.validate = s.validate, t.j2xParser = n(259), t.parseToNimn = function (e, n, r) {
                return t.convertTonimn(t.getTraversalObj(e, r), n, r)
            }
        }, 849: (e, t) => {
            "use strict";
            const n = "[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",
                r = new RegExp("^" + n + "$");
            t.isExist = function (e) {
                return void 0 !== e
            }, t.isEmptyObject = function (e) {
                return 0 === Object.keys(e).length
            }, t.merge = function (e, t, n) {
                if (t) {
                    const r = Object.keys(t), i = r.length;
                    for (let o = 0; o < i; o++) e[r[o]] = "strict" === n ? [t[r[o]]] : t[r[o]]
                }
            }, t.getValue = function (e) {
                return t.isExist(e) ? e : ""
            }, t.buildOptions = function (e, t, n) {
                var r = {};
                if (!e) return t;
                for (let i = 0; i < n.length; i++) void 0 !== e[n[i]] ? r[n[i]] = e[n[i]] : r[n[i]] = t[n[i]];
                return r
            }, t.isTagNameInArrayMode = function (e, t, n) {
                return !1 !== t && (t instanceof RegExp ? t.test(e) : "function" == typeof t ? !!t(e, n) : "strict" === t)
            }, t.isName = function (e) {
                return !(null == r.exec(e))
            }, t.getAllMatches = function (e, t) {
                const n = [];
                let r = t.exec(e);
                for (; r;) {
                    const i = [], o = r.length;
                    for (let e = 0; e < o; e++) i.push(r[e]);
                    n.push(i), r = t.exec(e)
                }
                return n
            }, t.nameRegexp = n
        }, 501: (e, t, n) => {
            "use strict";
            const r = n(849), i = {allowBooleanAttributes: !1}, o = ["allowBooleanAttributes"];

            function a(e, t) {
                for (var n = t; t < e.length; t++) if ("?" != e[t] && " " != e[t]) ; else {
                    var r = e.substr(n, t - n);
                    if (t > 5 && "xml" === r) return p("InvalidXml", "XML declaration allowed only at the start of the document.", m(e, t));
                    if ("?" == e[t] && ">" == e[t + 1]) {
                        t++;
                        break
                    }
                }
                return t
            }

            function s(e, t) {
                if (e.length > t + 5 && "-" === e[t + 1] && "-" === e[t + 2]) {
                    for (t += 3; t < e.length; t++) if ("-" === e[t] && "-" === e[t + 1] && ">" === e[t + 2]) {
                        t += 2;
                        break
                    }
                } else if (e.length > t + 8 && "D" === e[t + 1] && "O" === e[t + 2] && "C" === e[t + 3] && "T" === e[t + 4] && "Y" === e[t + 5] && "P" === e[t + 6] && "E" === e[t + 7]) {
                    let n = 1;
                    for (t += 8; t < e.length; t++) if ("<" === e[t]) n++; else if (">" === e[t] && (n--, 0 === n)) break
                } else if (e.length > t + 9 && "[" === e[t + 1] && "C" === e[t + 2] && "D" === e[t + 3] && "A" === e[t + 4] && "T" === e[t + 5] && "A" === e[t + 6] && "[" === e[t + 7]) for (t += 8; t < e.length; t++) if ("]" === e[t] && "]" === e[t + 1] && ">" === e[t + 2]) {
                    t += 2;
                    break
                }
                return t
            }

            function c(e, t) {
                let n = "", r = "", i = !1;
                for (; t < e.length; t++) {
                    if ('"' === e[t] || "'" === e[t]) if ("" === r) r = e[t]; else {
                        if (r !== e[t]) continue;
                        r = ""
                    } else if (">" === e[t] && "" === r) {
                        i = !0;
                        break
                    }
                    n += e[t]
                }
                return "" === r && {value: n, index: t, tagClosed: i}
            }

            t.validate = function (e, t) {
                t = r.buildOptions(t, i, o);
                const n = [];
                let u = !1, f = !1;
                "\ufeff" === e[0] && (e = e.substr(1));
                for (let i = 0; i < e.length; i++) if ("<" === e[i] && "?" === e[i + 1]) {
                    if (i += 2, i = a(e, i), i.err) return i
                } else {
                    if ("<" !== e[i]) {
                        if (" " === e[i] || "\t" === e[i] || "\n" === e[i] || "\r" === e[i]) continue;
                        return p("InvalidChar", "char '" + e[i] + "' is not expected.", m(e, i))
                    }
                    if (i++, "!" === e[i]) {
                        i = s(e, i);
                        continue
                    }
                    {
                        let o = !1;
                        "/" === e[i] && (o = !0, i++);
                        let g = "";
                        for (; i < e.length && ">" !== e[i] && " " !== e[i] && "\t" !== e[i] && "\n" !== e[i] && "\r" !== e[i]; i++) g += e[i];
                        if (g = g.trim(), "/" === g[g.length - 1] && (g = g.substring(0, g.length - 1), i--), v = g, !r.isName(v)) {
                            let t;
                            return t = 0 === g.trim().length ? "There is an unnecessary space between tag name and backward slash '</ ..'." : "Tag '" + g + "' is an invalid name.", p("InvalidTag", t, m(e, i))
                        }
                        const y = c(e, i);
                        if (!1 === y) return p("InvalidAttr", "Attributes for '" + g + "' have open quote.", m(e, i));
                        let h = y.value;
                        if (i = y.index, "/" === h[h.length - 1]) {
                            h = h.substring(0, h.length - 1);
                            const n = l(h, t);
                            if (!0 !== n) return p(n.err.code, n.err.msg, m(e, i - h.length + n.err.line));
                            u = !0
                        } else if (o) {
                            if (!y.tagClosed) return p("InvalidTag", "Closing tag '" + g + "' doesn't have proper closing.", m(e, i));
                            if (h.trim().length > 0) return p("InvalidTag", "Closing tag '" + g + "' can't have attributes or invalid starting.", m(e, i));
                            {
                                const t = n.pop();
                                if (g !== t) return p("InvalidTag", "Closing tag '" + t + "' is expected inplace of '" + g + "'.", m(e, i));
                                0 == n.length && (f = !0)
                            }
                        } else {
                            const r = l(h, t);
                            if (!0 !== r) return p(r.err.code, r.err.msg, m(e, i - h.length + r.err.line));
                            if (!0 === f) return p("InvalidXml", "Multiple possible root nodes found.", m(e, i));
                            n.push(g), u = !0
                        }
                        for (i++; i < e.length; i++) if ("<" === e[i]) {
                            if ("!" === e[i + 1]) {
                                i++, i = s(e, i);
                                continue
                            }
                            if ("?" !== e[i + 1]) break;
                            if (i = a(e, ++i), i.err) return i
                        } else if ("&" === e[i]) {
                            const t = d(e, i);
                            if (-1 == t) return p("InvalidChar", "char '&' is not expected.", m(e, i));
                            i = t
                        }
                        "<" === e[i] && i--
                    }
                }
                var v;
                return u ? !(n.length > 0) || p("InvalidXml", "Invalid '" + JSON.stringify(n, null, 4).replace(/\r?\n/g, "") + "' found.", 1) : p("InvalidXml", "Start tag expected.", 1)
            };
            const u = new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");

            function l(e, t) {
                const n = r.getAllMatches(e, u), i = {};
                for (let r = 0; r < n.length; r++) {
                    if (0 === n[r][1].length) return p("InvalidAttr", "Attribute '" + n[r][2] + "' has no space in starting.", v(e, n[r][0]));
                    if (void 0 === n[r][3] && !t.allowBooleanAttributes) return p("InvalidAttr", "boolean attribute '" + n[r][2] + "' is not allowed.", v(e, n[r][0]));
                    const o = n[r][2];
                    if (!f(o)) return p("InvalidAttr", "Attribute '" + o + "' is an invalid name.", v(e, n[r][0]));
                    if (i.hasOwnProperty(o)) return p("InvalidAttr", "Attribute '" + o + "' is repeated.", v(e, n[r][0]));
                    i[o] = 1
                }
                return !0
            }

            function d(e, t) {
                if (";" === e[++t]) return -1;
                if ("#" === e[t]) return function (e, t) {
                    let n = /\d/;
                    for ("x" === e[t] && (t++, n = /[\da-fA-F]/); t < e.length; t++) {
                        if (";" === e[t]) return t;
                        if (!e[t].match(n)) break
                    }
                    return -1
                }(e, ++t);
                let n = 0;
                for (; t < e.length; t++, n++) if (!(e[t].match(/\w/) && n < 20)) {
                    if (";" === e[t]) break;
                    return -1
                }
                return t
            }

            function p(e, t, n) {
                return {err: {code: e, msg: t, line: n}}
            }

            function f(e) {
                return r.isName(e)
            }

            function m(e, t) {
                return e.substring(0, t).split(/\r?\n/).length
            }

            function v(e, t) {
                return e.indexOf(t) + t.length
            }
        }, 468: e => {
            "use strict";
            e.exports = function (e, t, n) {
                this.tagname = e, this.parent = t, this.child = {}, this.attrsMap = {}, this.val = n, this.addChild = function (e) {
                    Array.isArray(this.child[e.tagname]) ? this.child[e.tagname].push(e) : this.child[e.tagname] = [e]
                }
            }
        }, 543: (e, t, n) => {
            "use strict";
            const r = n(849), i = n(849).buildOptions, o = n(468);
            "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, r.nameRegexp), !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
            const a = {
                attributeNamePrefix: "@_",
                attrNodeName: !1,
                textNodeName: "#text",
                ignoreAttributes: !0,
                ignoreNameSpace: !1,
                allowBooleanAttributes: !1,
                parseNodeValue: !0,
                parseAttributeValue: !1,
                arrayMode: !1,
                trimValues: !0,
                cdataTagName: !1,
                cdataPositionChar: "\\c",
                tagValueProcessor: function (e, t) {
                    return e
                },
                attrValueProcessor: function (e, t) {
                    return e
                },
                stopNodes: []
            };
            t.defaultOptions = a;
            const s = ["attributeNamePrefix", "attrNodeName", "textNodeName", "ignoreAttributes", "ignoreNameSpace", "allowBooleanAttributes", "parseNodeValue", "parseAttributeValue", "arrayMode", "trimValues", "cdataTagName", "cdataPositionChar", "tagValueProcessor", "attrValueProcessor", "parseTrueNumberOnly", "stopNodes"];

            function c(e, t, n) {
                return t && (n.trimValues && (t = t.trim()), t = l(t = n.tagValueProcessor(t, e), n.parseNodeValue, n.parseTrueNumberOnly)), t
            }

            function u(e, t) {
                if (t.ignoreNameSpace) {
                    const t = e.split(":"), n = "/" === e.charAt(0) ? "/" : "";
                    if ("xmlns" === t[0]) return "";
                    2 === t.length && (e = n + t[1])
                }
                return e
            }

            function l(e, t, n) {
                if (t && "string" == typeof e) {
                    let t;
                    return "" === e.trim() || isNaN(e) ? t = "true" === e || "false" !== e && e : (-1 !== e.indexOf("0x") ? t = Number.parseInt(e, 16) : -1 !== e.indexOf(".") ? (t = Number.parseFloat(e), e = e.replace(/\.?0+$/, "")) : t = Number.parseInt(e, 10), n && (t = String(t) === e ? t : e)), t
                }
                return r.isExist(e) ? e : ""
            }

            t.props = s;
            const d = new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])(.*?)\\3)?", "g");

            function p(e, t) {
                if (!t.ignoreAttributes && "string" == typeof e) {
                    e = e.replace(/\r?\n/g, " ");
                    const n = r.getAllMatches(e, d), i = n.length, o = {};
                    for (let e = 0; e < i; e++) {
                        const r = u(n[e][1], t);
                        r.length && (void 0 !== n[e][4] ? (t.trimValues && (n[e][4] = n[e][4].trim()), n[e][4] = t.attrValueProcessor(n[e][4], r), o[t.attributeNamePrefix + r] = l(n[e][4], t.parseAttributeValue, t.parseTrueNumberOnly)) : t.allowBooleanAttributes && (o[t.attributeNamePrefix + r] = !0))
                    }
                    if (!Object.keys(o).length) return;
                    if (t.attrNodeName) {
                        const e = {};
                        return e[t.attrNodeName] = o, e
                    }
                    return o
                }
            }

            function f(e, t) {
                let n, r = "";
                for (let i = t; i < e.length; i++) {
                    let t = e[i];
                    if (n) t === n && (n = ""); else if ('"' === t || "'" === t) n = t; else {
                        if (">" === t) return {data: r, index: i};
                        "\t" === t && (t = " ")
                    }
                    r += t
                }
            }

            function m(e, t, n, r) {
                const i = e.indexOf(t, n);
                if (-1 === i) throw new Error(r);
                return i + t.length - 1
            }

            t.getTraversalObj = function (e, t) {
                e = e.replace(/\r\n?/g, "\n"), t = i(t, a, s);
                const n = new o("!xml");
                let u = n, l = "";
                for (let n = 0; n < e.length; n++) if ("<" === e[n]) if ("/" === e[n + 1]) {
                    const i = m(e, ">", n, "Closing Tag is not closed.");
                    let o = e.substring(n + 2, i).trim();
                    if (t.ignoreNameSpace) {
                        const e = o.indexOf(":");
                        -1 !== e && (o = o.substr(e + 1))
                    }
                    u && (u.val ? u.val = r.getValue(u.val) + "" + c(o, l, t) : u.val = c(o, l, t)), t.stopNodes.length && t.stopNodes.includes(u.tagname) && (u.child = [], null == u.attrsMap && (u.attrsMap = {}), u.val = e.substr(u.startIndex + 1, n - u.startIndex - 1)), u = u.parent, l = "", n = i
                } else if ("?" === e[n + 1]) n = m(e, "?>", n, "Pi Tag is not closed."); else if ("!--" === e.substr(n + 1, 3)) n = m(e, "--\x3e", n, "Comment is not closed."); else if ("!D" === e.substr(n + 1, 2)) {
                    const t = m(e, ">", n, "DOCTYPE is not closed.");
                    n = e.substring(n, t).indexOf("[") >= 0 ? e.indexOf("]>", n) + 1 : t
                } else if ("![" === e.substr(n + 1, 2)) {
                    const i = m(e, "]]>", n, "CDATA is not closed.") - 2, a = e.substring(n + 9, i);
                    if (l && (u.val = r.getValue(u.val) + "" + c(u.tagname, l, t), l = ""), t.cdataTagName) {
                        const e = new o(t.cdataTagName, u, a);
                        u.addChild(e), u.val = r.getValue(u.val) + t.cdataPositionChar, a && (e.val = a)
                    } else u.val = (u.val || "") + (a || "");
                    n = i + 2
                } else {
                    const i = f(e, n + 1);
                    let a = i.data;
                    const s = i.index, d = a.indexOf(" ");
                    let m = a, v = !0;
                    if (-1 !== d && (m = a.substr(0, d).replace(/\s\s*$/, ""), a = a.substr(d + 1)), t.ignoreNameSpace) {
                        const e = m.indexOf(":");
                        -1 !== e && (m = m.substr(e + 1), v = m !== i.data.substr(e + 1))
                    }
                    if (u && l && "!xml" !== u.tagname && (u.val = r.getValue(u.val) + "" + c(u.tagname, l, t)), a.length > 0 && a.lastIndexOf("/") === a.length - 1) {
                        "/" === m[m.length - 1] ? (m = m.substr(0, m.length - 1), a = m) : a = a.substr(0, a.length - 1);
                        const e = new o(m, u, "");
                        m !== a && (e.attrsMap = p(a, t)), u.addChild(e)
                    } else {
                        const e = new o(m, u);
                        t.stopNodes.length && t.stopNodes.includes(e.tagname) && (e.startIndex = s), m !== a && v && (e.attrsMap = p(a, t)), u.addChild(e), u = e
                    }
                    l = "", n = s
                } else l += e[n];
                return n
            }
        }, 747: e => {
            "use strict";
            e.exports = require("fs")
        }, 87: e => {
            "use strict";
            e.exports = require("os")
        }, 622: e => {
            "use strict";
            e.exports = require("path")
        }
    }, t = {};

    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {exports: {}};
        return e[r].call(o.exports, o, o.exports, n), o.exports
    }

    n.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return n.d(t, {a: t}), t
    }, n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, (() => {
        const {ECRClient: e, BatchGetImageCommand: t} = n(656), r = n(225);
        (async () => {
            try {
                var n;
                const i = r.getInput("region"), o = new e({region: i}), a = r.getInput("registry").split("/")[1],
                    s = r.getInput("registry"), c = new t({repositoryName: a, imageIds: [{imageTag: s}]}),
                    u = await o.send(c);
                (null == u || null === (n = u.images) || void 0 === n ? void 0 : n.length) >= 1 ? r.setOutput("found", "true") : r.setOutput("found", "false")
            } catch (e) {
                r.setFailed(e.message)
            }
        })()
    })()
})();