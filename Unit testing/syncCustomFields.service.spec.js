(function () {
    'use strict';

    describe('Sync Custom Fields Service', function () {
        var syncCustomFieldsService, $httpBackend, config;

        beforeEach(module('supportDashboardFrontend'));

        beforeEach(inject(function (_syncCustomFieldsService_, _$httpBackend_, _config_) {
            syncCustomFieldsService = _syncCustomFieldsService_;
            $httpBackend = _$httpBackend_;
            config = _config_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation(false);
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be registered', function () {
            expect(syncCustomFieldsService).not.toEqual(null);
        });

        describe('.getJobList', function () {
            it('should get a list of sync custom fields jobs', function (done) {
                var response = {
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

                $httpBackend.expect('GET', config.apiUrl + 'server/custom-field-sync-job/')
                    .respond(200, response);

                syncCustomFieldsService.getJobList().then(function (data) {
                    expect(data).toEqual(response);
                    done();
                });

                $httpBackend.flush();
            });
        });

        describe('.createSyncJob', function () {
            it('should send a post request and get the created job in response', function (done) {
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

                var data = {
                    title: "blahsdfijlk2 wljsk",
                    instance: {
                        access_key: "30e9757b4581cd47188179d789456aaa",
                        state: "sandbox",
                        org_id: "52fcf709add284d50d0000cc",
                        name: "Answers.com",
                        sso_id: "52b7a0e75a2a59c0160000d6"
                    },
                    file_edit_url: "https://www.google.com/LOL",
                    file_download_url: "https://learn.zu.ac.ae/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx"
                }

                $httpBackend.expect('POST', config.apiUrl + 'server/custom-field-sync-job/', data)
                    .respond(200, expected_response);

                syncCustomFieldsService.createSyncJob(data).then(function (response) {
                    expect(response).toEqual(expected_response);
                    done();
                });

                $httpBackend.flush();
            });
        });

        describe('.getSyncCustomFieldsJob', function () {
            it('should get a particular sync customfield job info', function (done) {
                var expected_response = {
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
                };

                var id = 7;

                $httpBackend.expect('GET', config.apiUrl + 'server/custom-field-sync-job/7')
                    .respond(200, expected_response);

                syncCustomFieldsService.getSyncCustomFieldsJob(id).then(function (data) {
                    expect(data).toEqual(expected_response);
                    done();
                });

                $httpBackend.flush();
            });
        });

        describe('.deleteSyncCustomFieldsJob', function () {
            it('should delete a particular job', function (done) {
                var expected_response = {
                    message: 'No such job exists',
                    deleted: false
                };

                var id = 7;

                $httpBackend.expect('DELETE', config.apiUrl + 'server/custom-field-sync-job/7')
                    .respond(200, expected_response);

                syncCustomFieldsService.deleteSyncCustomFieldsJob(id).then(function (data) {
                    expect(data).toEqual(expected_response);
                    done();
                });

                $httpBackend.flush();
            });
        });

        describe('.createSpreadsheet', function () {
            it('should return the spreadsheet link for the particular parent organization', function (done) {
                var expected_response = {
                    editUrl: "https://www.google.com/LOL",
                    downloadUrl: "https://learn.zu.ac.ae/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx"
                };

                var data = {
                    name: "2017 Child A",
                    access_key: "297e9a8e71cc09d2620613ty",
                    id: "587e9a8e71cc09d2620613fd"
                }

                $httpBackend.expect('POST', config.apiUrl + 'server/custom-field-sync-job/create-spreadsheet/')
                    .respond(200, expected_response);

                syncCustomFieldsService.createSpreadsheet(data).then(function (data) {
                    expect(data).toEqual(expected_response);
                    done();
                });

                $httpBackend.flush();
            });
        });

        describe('.runSyncCustomFieldsJob', function () {
            it('should run the particular job', function (done) {
                var expected_response = {
                    created_at: "2017-10-22T04:43:41.203464Z",
                    created_by: "Ahmed Sayeed Wasif",
                    created_by_id: 1,
                    file_edit_url: "https://www.google.com/LOL",
                    file_download_url: "https://learn.zu.ac.ae/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx",
                    id: 7,
                    job_status: "SUCCESS",
                    organization_id: "587e9a8e71cc09d2620613fd",
                    organization_name: "2017 Child A",
                    title: "Capture Iron Throne"
                };

                var id = 7;

                $httpBackend.expect('POST', config.apiUrl + 'server/custom-field-sync-job/7/run/')
                    .respond(200, expected_response);

                syncCustomFieldsService.runSyncCustomFieldsJob(id).then(function (data) {
                    expect(data).toEqual(expected_response);
                    done();
                });

                $httpBackend.flush();
            });
        });

        describe('.getSpreadsheetData', function () {
            it('get the already created spreadsheet for the particular parent organization', function (done) {
                var expected_response = {
                    message: 'No such job exists'
                };

                var id = 7;

                $httpBackend.expect('GET', config.apiUrl + 'server/custom-field-sync-job/get-spreadsheet-data/7')
                    .respond(200, expected_response);

                syncCustomFieldsService.getSpreadsheetData(id).then(function (data) {
                    expect(data).toEqual(expected_response);
                    done();
                });

                $httpBackend.flush();
            });
        });
    });
})();