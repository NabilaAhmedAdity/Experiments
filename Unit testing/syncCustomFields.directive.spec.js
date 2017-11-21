(function () {
    'use strict';

    describe('Sync Custom Fields Directive', function () {
        var $scope, directiveCtrl, $compile, syncCustomFieldsService, $q, Element, response1, tag, $uibModal, fakeModal;
        var modalCreateJobClicked;

        beforeEach(module('supportDashboardFrontend'));

        beforeEach(module(function ($provide) {
            var data_from_modal = {
                instance: {
                    access_key: "30e9757b4581cd47188179d789456aaa",
                    state: "sandbox",
                    org_id: "52fcf709add284d50d0000cc",
                    name: "Answers.com",
                    sso_id: "52b7a0e75a2a59c0160000d6"
                },
                title: "blahsdfijlk2 wljsk",
                file_edit_url: "https://www.google.com/LOL",
                file_download_url: "https://learn.zu.ac.ae/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx"
            }
            expected_modal = {
                result: {
                    then: function (createJobCallback, cancelCallback) {
                        if (modalCreateJobClicked) {
                            createJobCallback(data_from_modal);
                        } else {
                            cancelCallback();
                        }
                    }
                }
            };

            $provide.service("$uibModal", function () {
                this.open = function () {
                    return true;
                };
            });
        }));

        beforeEach(inject(function (_$rootScope_, _syncCustomFieldsService_, _$q_, _$uibModal_, _$compile_) {
            $scope = _$rootScope_.$new();
            $q = _$q_;
            $compile = _$compile_;
            syncCustomFieldsService = _syncCustomFieldsService_;
            $uibModal = _$uibModal_;

            tag = angular.element('<sync-custom-fields></sync-custom-fields>');
            Element = $compile(tag)($scope);
            $scope.$digest();

            directiveCtrl = tag.controller('syncCustomFields');
        }));

        it('should apply template', function () {
            expect(Element.html()).not.toEqual('');
        });

        it('should define controller', function () {
            expect(directiveCtrl).toBeDefined();
        });

        describe('.syncCustomFieldsModalOpen', function () {
            beforeEach(function () {
                var expected_response = {
                    custom_field_sync_job: {
                        created_at: "2017-10-22T04:43:41.203464Z",
                        created_by: "Ahmed Sayeed Wasif",
                        created_by_id: 1,
                        file_edit_url: "https://www.google.com/LOL",
                        file_download_url: "https://learn.zu.ac.ae/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx",
                        id: 7,
                        job_status: "CREATED",
                        organization_id: "587e9a8e71cc09d2620613fd",
                        organization_name: "2017 Child A",
                        title: "Capture Iron Throne"
                    }
                };

                spyOn($uibModal, 'open').and.returnValue(expected_modal);

                spyOn(syncCustomFieldsService, 'createSyncJob').and.returnValue($q.resolve(expected_response));
            });

            var createJobClicked = function () {
                modalCreateJobClicked = true;
                directiveCtrl.syncCustomFieldsModalOpen();
                expect($uibModal.open).toHaveBeenCalled();
                var actual_modal = $uibModal.open();
                expect(expected_modal).toEqual(actual_modal);
                actual_modal.result.then(function createJobCallback(data) {
                    expect(data_from_modal).toEqual(data);
                    expect(syncCustomFieldsService.createSyncJob).toHaveBeenCalledWith(data);
                    var response = syncCustomFieldsService.createSyncJob(data);
                    expect(expected_response).toEqual(response);
                }, function cancelCallback() {

                });
            };

            var cancelClicked = function () {
                modalCreateJobClicked = false;
                directiveCtrl.syncCustomFieldsModalOpen();
                expect($uibModal.open).toHaveBeenCalled();
                var actual_modal = $uibModal.open();
                expect(expected_modal).toEqual(actual_modal);
                actual_modal.result.then(function createJobCallback(data) {

                }, function cancelCallback() {

                });
            };

            describe('Select fields to create a job', function () {
                it('should open a modal and successfully send request to server', function () {
                    createJobClicked();
                });

                it('should open a modal and cancel the modal after cancel is clicked', function () {
                    cancelClicked();
                });
            });
        });

        describe('.populateJobList', function () {
            beforeEach(function () {
                var expected_response = {
                    fields_back_populate_jobs: [
                        {
                            created_at: "2017-10-22T04:43:41.203464Z",
                            created_by: "Ahmed Sayeed Wasif",
                            created_by_id: 1,
                            file_edit_url: "https://www.google.com/LOL",
                            file_download_url: "https://learn.zu.ac.ae/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx",
                            id: 7,
                            job_status: "CREATED",
                            organization_id: "587e9a8e71cc09d2620613fd",
                            organization_name: "2017 Child A",
                            title: "Capture Iron Throne"
                        }]
                };

                spyOn(syncCustomFieldsService, 'getJobList').and.returnValue($q.resolve(expected_response));
            });
            
            it('should fetch a list of Sync Custom Fields jobs', function (done) {
                directiveCtrl.populateJobList();
                expect(syncCustomFieldsService.getJobList).toHaveBeenCalled();
                var actual_response = syncCustomFieldsService.getJobList();
                expect(actual_response).toEqual(expected_response);
                done();
            });
        });
    });
})();