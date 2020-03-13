import { Component, OnInit, TemplateRef } from '@angular/core';
import { FriendsService } from './core/http/services/friends.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as icons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'secret-friend';
  public isEditing = false
  public friends = []
  public friendTemp
  public friendForm
  public isLoading = false
  public emailSent = false
  modalRef: BsModalRef;
  iconAdd = icons.faPlusCircle
  iconSort = icons.faRandom

  constructor(private friendsService: FriendsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getFriends();
    this.createForm()
  }

  getFriends() {
    this.isLoading = true
    this.friendsService.getFriends()
      .subscribe((res) => {
        this.friends = res
        console.log(res);
        this.isLoading = false

      }, (error) => {
        console.log(error);
        this.isLoading = false
      })
  }

  drawFriends() {
    this.isLoading = true
    this.friendsService.drawFriends()
      .subscribe((res) => {
        this.friends = res
        this.isLoading = false
        this.emailSent = true
        console.log(res);
      }, (error) => {
        console.log(error);
        this.isLoading = false
      })
  }

  loadDatatoEdit(friendTemp, template: TemplateRef<any>, index) {
    this.friendTemp = friendTemp
    this.friendTemp.index = index
    this.modalRef = this.modalService.show(template)
    this.friendForm.controls.name.setValue(friendTemp.name)
    this.friendForm.controls.email.setValue(friendTemp.email)
  }

  editFriend() {
    this.friendsService.editFriends(this.friendTemp._id, this.friendForm.value)
      .subscribe((res) => {
        const newFriendEdited = { ...this.friendTemp, ...this.friendForm.value }
        this.friends[this.friendTemp.index] = newFriendEdited
        this.friendTemp = {}
        this.closeModal()
        this.isEditing = false
      }, (error) => {
        console.log(error);
      })
  }

  createFriend() {
    this.friendsService.newFriend(this.friendForm.value)
      .subscribe((res) => {
        alert(res.message)
        console.log(res);
        this.friends.push(res.newUser)
        this.closeModal()
      }, (error) => {
        console.log(error);
      })
  }

  deleteFriend(friendTemp, index) {

    if (confirm("Tem certeza que deseja excluir?")) {
      this.friendsService.deleteFriend(friendTemp._id)
        .subscribe(() => {
          this.friends.splice(index, 1)
        }, (error) => {
          console.log(error);
        })
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
    this.friendForm.reset()
  }

  createForm() {
    this.friendForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }
}
