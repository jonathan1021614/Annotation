<?php namespace App\Http\Controllers;

use App\AuthTable;
use App\User;
use Illuminate\Support\Facades\Request;
use OAuth;

/**
 * Created by PhpStorm.
 * User: flyx
 * Date: 4/14/15
 * Time: 9:10 PM
 */
class AuthController extends Controller
{

    function getLogin()
    {

        return view('auth.login', [
            'callback_uri' => Request::input('callback_uri')
        ]);
    }

    function getLogout()
    {
        //clear session
        User::logout();
        //back to login page
        return redirect('auth/login');
    }

    public function getFacebook()
    {

        $callback_uri = Request::input('callback_uri');
        // get data from request
        $code = Request::input('code');

        // get full url as facebook redirect url
        $redirect_url = Request::fullUrl();

        // get fb service
        $fb = \OAuth::consumer('Facebook', $redirect_url);

        // if code is provided get user data and sign in
        if ( ! is_null($code) || User::check())
        {
            $_user = User::user();

            if($_user == null) {
                // This was a callback request from facebook, get the token
                $token = $fb->requestAccessToken($code);

                // Send a request with it
                $user = json_decode($fb->request('/me'), false);

                // user login
                $_user = User::login($user, $token->getAccessToken());
            }

            // check if it was external website called
            if($callback_uri != null)
            {
                // generate a auth token for this extenal site
                $auth = AuthTable::add($_user->id, $callback_uri);

                //check callback query string exist
                $hasQuery = strstr($callback_uri, '?');

                //add token to query string
                $callback_uri .= '#user_id='. $_user->id .'&anno_token='. $auth->auth_token;

                //back to this external site
                return redirect($callback_uri);
            }
            else
            {
                //back to home page
                return redirect('/home');
            }
        }
        // if not ask for permission first
        else
        {
            // get fb authorization
            $url = $fb->getAuthorizationUri();

            // return to facebook login url

            return redirect((string)$url);
        }
    }

}