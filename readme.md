env

PORT=


------------------------------

service api

parth               method      params      body
/auth/register      POST        none        { s_code, password, confirmPassword, firstname, email }
/auh/login          POST        none        { t_code or s_code, password }
